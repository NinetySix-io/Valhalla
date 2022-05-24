import { IServiceServer } from '@nestcloud2/common';
import { InjectService } from '@nestcloud2/service';
import { ConsulService } from '@nestcloud2/service/service.consul';
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';

@Injectable()
export class ConsulConfigService implements OnModuleInit {
  private logger = new Logger(ConsulConfigService.name);
  private graphqlTag = 'graphql' as const;
  private services: IServiceServer[] = [];

  constructor(@InjectService() private readonly consul: ConsulService) {}

  onModuleInit() {
    this.syncServices();
  }

  /**
   * It watches the list of services in Consul, and when it changes, it updates the list of services in
   * the application
   */
  syncServices() {
    this.logger.debug('Start syncing consul services');
    this.consul.watchServiceList((services) => {
      this.logger.debug('Consul services sync');
      const nextServices = services.map((service) => {
        //TODO: consul should give us a random node already
        return this.consul.getServiceServers(service)[0];
      });

      this.services = nextServices;
    });
  }

  /**
   * It returns an array of services that have the `graphql` tag
   * @returns An array of services that have the graphql tag.
   */
  get graphqlServices() {
    return this.services.filter((service) =>
      service.tags?.includes(this.graphqlTag),
    );
  }
}
