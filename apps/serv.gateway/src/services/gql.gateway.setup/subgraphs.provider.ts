import { ServiceEndpointDefinition } from '@apollo/gateway';
import { Boot, InjectBoot } from '@nestcloud2/boot';
import { IServiceServer } from '@nestcloud2/common';
import { InjectService } from '@nestcloud2/service';
import { ConsulService } from '@nestcloud2/service/service.consul';
import { Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ServAppConfigService } from '@valhalla/serv.core';
import { isDev } from '@valhalla/utilities';
import CronTime from 'cron-time-generator';
import keyBy from 'lodash.keyby';

const syncInterval = isDev()
  ? CronExpression.EVERY_10_SECONDS
  : CronTime.every(10).minutes();

export abstract class SubgraphsProvider implements OnModuleInit {
  private logger = new Logger(SubgraphsProvider.name);
  private _subgraphs: ServiceEndpointDefinition[];

  constructor(
    @InjectService() private readonly consul: ConsulService,
    @InjectBoot() private readonly boot: Boot,
  ) {}

  onModuleInit() {
    this.syncServices();
  }

  @Cron(syncInterval)
  private syncServices() {
    const services = this.consul.getServiceNames();
    this.buildSubgraphs(services);
  }

  /**
   * Callback on subgraph update
   */
  abstract onSubgraphUpdated(): void;

  /**
   * If the service address is the same as the devHost, then we'll use the address 'http://0.0.0.0'
   * instead
   * @param {IServiceServer} service - IServiceServer - this is the service object that is passed in
   * from the service.json file.
   * @returns The service domain is being returned.
   */
  private resolveServiceDomain(service: IServiceServer): string {
    const address = isDev() ? 'http://0.0.0.0' : service.address;
    const servicePort = Number(service.port);
    const listeningPort = ServAppConfigService.calculateRestPort(servicePort);
    return `${address}:${listeningPort}/graphql`;
  }

  /**
   * It takes a list of service names, and returns a list of service endpoints
   * @param {string[]} serviceNames - The list of services that you want to build subgraphs for.
   * @returns The subgraphs are being returned.
   */
  private async buildSubgraphs(serviceNames: string[]): Promise<void> {
    const currentSubgraphMap = keyBy(
      this._subgraphs ?? [],
      (graph) => graph.name,
    );

    const newGraphConfigs: string[] = [];
    const nextSubgraphs: ServiceEndpointDefinition[] = [];
    const nextSubgraphsMap: { [key: string]: boolean } = {};

    for await (const service of serviceNames) {
      const nodes = this.consul.getServiceServers(service);
      const assignedNode = nodes[0];

      if (
        this.boot.get('service.name') === service ||
        !assignedNode?.service ||
        !assignedNode.tags?.includes('graphql')
      ) {
        continue;
      }

      const graphName = assignedNode.service;
      const isInCurrent = currentSubgraphMap[assignedNode.service];
      const graphUrl = this.resolveServiceDomain(assignedNode);

      nextSubgraphsMap[graphName] = true;
      nextSubgraphs.push({ name: graphName, url: graphUrl });

      if (!isInCurrent) {
        newGraphConfigs.push(assignedNode.service);
      }
    }

    const removedGraphs = Object.keys(currentSubgraphMap).filter(
      (graphName) => !nextSubgraphsMap[graphName],
    );

    this._subgraphs = nextSubgraphs;
    const hasRemoval = removedGraphs.length > 0;
    const hasAddition = newGraphConfigs.length > 0;

    hasRemoval && this.logger.warn('Subgraphs removed', removedGraphs);
    hasAddition && this.logger.warn('Subgraphs added', newGraphConfigs);
    if (hasAddition || hasRemoval) {
      this.logger.debug('Subgraphs update detected');
      this.onSubgraphUpdated();
    }
  }

  /**
   * > It returns the subgraphs if they've already been built, otherwise it builds them and returns the
   * result
   * @returns An array of ServiceEndpointDefinition objects.
   */
  get subgraphs(): ServiceEndpointDefinition[] {
    return this._subgraphs;
  }
}
