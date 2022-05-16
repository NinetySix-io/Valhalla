import {
  EventStoreModuleOptions,
  EventStoreOptionsFactory,
} from '../../modules/event.store.module/contract';
import { InjectConfig } from '@nestcloud2/config';
import { EtcdConfig } from '@nestcloud2/config/config.etcd';
import { Injectable } from '@nestjs/common';
import { ConsulDatabaseConfig } from './types';

@Injectable()
export class EventStoreConfigService implements EventStoreOptionsFactory {
  constructor(@InjectConfig() private readonly config: EtcdConfig) {}

  createEventStoreOptions(): EventStoreModuleOptions {
    const database = this.config.get<ConsulDatabaseConfig>('database');

    return {
      type: 'event-store',
      tcpEndpoint: {
        host: database?.eventStore?.hostname,
        port: database?.eventStore?.tcpPort,
      },
      options: {
        defaultUserCredentials: {
          password: database?.eventStore?.tcpPassword,
          username: database?.eventStore?.tcpUsername,
        },
      },
    };
  }
}
