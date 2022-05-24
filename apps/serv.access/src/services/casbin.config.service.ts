import { aclPath } from '@app/constants';
import { InjectConfig } from '@nestcloud2/config';
import { ConsulConfig } from '@nestcloud2/config/config.consul';
import { Injectable } from '@nestjs/common';
import {
  NestCasbinModuleOptions,
  NestCasbinOptionsFactory,
} from 'nestjs-casbin';
import { MongoAdapter } from '../lib/casbin.mongodb.adapter';

@Injectable()
export class CasbinConfigService implements NestCasbinOptionsFactory {
  constructor(@InjectConfig() private readonly config: ConsulConfig) {}

  private get configKey() {
    return 'database.mongodb.uri';
  }

  async createCasbinOptions(): Promise<NestCasbinModuleOptions> {
    const connectionStr = this.config.get<string>(this.configKey);
    const lastIndex = connectionStr.lastIndexOf('/');
    const uri = connectionStr.slice(0, lastIndex);
    const database = connectionStr.slice(lastIndex + 1, connectionStr.length);
    const adapter = await MongoAdapter.newAdapter({
      uri,
      database,
      collection: 'acl',
    });

    return {
      adapter,
      model: aclPath,
    };
  }
}
