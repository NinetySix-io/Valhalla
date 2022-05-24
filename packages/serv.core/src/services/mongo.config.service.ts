import { InjectConfig } from '@nestcloud2/config';
import { ConsulConfig } from '@nestcloud2/config/config.consul';
import { Injectable } from '@nestjs/common';
import {
  TypegooseModuleOptions,
  TypegooseOptionsFactory,
} from 'nestjs-typegoose';

@Injectable()
export class MongoConfigService implements TypegooseOptionsFactory {
  constructor(@InjectConfig() private readonly config: ConsulConfig) {}

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
