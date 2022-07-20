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
  private _subgraphs!: ServiceEndpointDefinition[];

  constructor(
    @InjectService() private readonly consul: ConsulService,
    @InjectBoot() private readonly boot: Boot,
  ) {}

  onModuleInit() {
    this.syncServices();
  }

  @Cron(syncInterval)
  private syncServices() {
    const services = this.consul.getServiceNames() ?? [];
    this.buildSubgraphs(services);
  }

  /**
   * Callback on subgraph update
   */
  abstract onSubgraphUpdated(): void;

  /**
   * If the service address is the same as the devHost, then we'll use the address 'http://0.0.0.0'
   * instead
   */
  private resolveServiceDomain(service: IServiceServer): string {
    const address = isDev() ? 'http://0.0.0.0' : service.address;
    const servicePort = Number(service.port);
    const listeningPort = ServAppConfigService.calculateRestPort(servicePort);
    return `${address}:${listeningPort}/graphql`;
  }

  /**
   * It takes a list of service names, and returns a list of service endpoints
   */
  private buildSubgraphs(serviceNames: string[]) {
    const currentSubgraphMap = keyBy(
      this._subgraphs ?? [],
      (graph) => graph.name,
    );

    const newGraphConfigs: string[] = [];
    const nextSubgraphs: ServiceEndpointDefinition[] = [];
    const nextSubgraphsMap: { [key: string]: boolean } = {};
    const currentGraphNames = Object.keys(currentSubgraphMap);

    for (const service of serviceNames) {
      const nodes = this.consul.getServiceServers(service);
      const isGateway = this.boot.get('service.name') === service;
      const hasGql = nodes[0]?.tags?.includes('graphql');
      const serviceName = nodes[0]?.service;
      const isInCurrent = currentSubgraphMap[serviceName];

      if (isGateway || !serviceName || !hasGql) {
        continue;
      }

      !isInCurrent && newGraphConfigs.push(serviceName);
      nextSubgraphsMap[serviceName] = true;

      for (const node of nodes) {
        const graphUrl = this.resolveServiceDomain(node);
        nextSubgraphs.push({
          name: serviceName,
          url: graphUrl,
        });
      }
    }

    this._subgraphs = nextSubgraphs;
    const removedGraphs = currentGraphNames.filter((g) => !nextSubgraphsMap[g]);
    const hasRemoval = removedGraphs.length > 0;
    const hasAddition = newGraphConfigs.length > 0;

    hasRemoval && this.logger.warn('Subgraphs removed', removedGraphs);
    hasAddition && this.logger.warn('Subgraphs added', newGraphConfigs);
    this.onSubgraphUpdated();
  }

  /**
   * > It returns the subgraphs if they've already been built, otherwise it builds them and returns the
   * result
   */
  get subgraphs(): ServiceEndpointDefinition[] {
    return this._subgraphs;
  }
}
