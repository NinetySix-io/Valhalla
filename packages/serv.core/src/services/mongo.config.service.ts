import { Boot, InjectBoot } from '@nestcloud2/boot';
import { Injectable } from '@nestjs/common';
import {
  TypegooseModuleOptions,
  TypegooseOptionsFactory,
} from 'nestjs-typegoose';

@Injectable()
export class MongoConfigService implements TypegooseOptionsFactory {
  constructor(@InjectBoot() private readonly boot: Boot) {}

  private get configKey() {
    return 'mongodb';
  }

  createTypegooseOptions(): TypegooseModuleOptions {
    type ConfigType = { uri: string };
    const config = this.boot.get<ConfigType>(this.configKey);
    return {
      uri: config.uri,
    };
  }
}
