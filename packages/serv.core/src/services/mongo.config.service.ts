import { Injectable } from '@nestjs/common';
import { InjectConfig } from '@nestcloud2/config';
import { EtcdConfig } from '@nestcloud2/config/config.etcd';
import {
  TypegooseModuleOptions,
  TypegooseOptionsFactory,
} from 'nestjs-typegoose';

@Injectable()
export class MongoConfigService implements TypegooseOptionsFactory {
  constructor(@InjectConfig() private readonly config: EtcdConfig) {}

  private get configKey() {
    return 'database.mongodb';
  }

  createTypegooseOptions(): TypegooseModuleOptions {
    type ConfigType = { uri: string };
    const config = this.config.get<ConfigType>(this.configKey);
    return {
      uri: config.uri,
    };
  }
}
