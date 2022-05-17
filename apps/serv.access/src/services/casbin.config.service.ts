import { InjectConfig } from '@nestcloud2/config';
import { EtcdConfig } from '@nestcloud2/config/config.etcd';
import { Injectable } from '@nestjs/common';
import { aclPath } from '@app/constants';
import { MongoAdapter } from '../lib/casbin.mongodb.adapter';
import {
  NestCasbinModuleOptions,
  NestCasbinOptionsFactory,
} from 'nestjs-casbin';

@Injectable()
export class CasbinConfigService implements NestCasbinOptionsFactory {
  constructor(@InjectConfig() private readonly config: EtcdConfig) {}

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
