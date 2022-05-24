import { aclPath } from '@app/constants';
import { Boot, InjectBoot } from '@nestcloud2/boot';
import { Injectable } from '@nestjs/common';
import {
  NestCasbinModuleOptions,
  NestCasbinOptionsFactory,
} from 'nestjs-casbin';
import { MongoAdapter } from '../lib/casbin.mongodb.adapter';

@Injectable()
export class CasbinConfigService implements NestCasbinOptionsFactory {
  constructor(@InjectBoot() private readonly boot: Boot) {}

  private get configKey() {
    return 'mongodb.uri';
  }

  async createCasbinOptions(): Promise<NestCasbinModuleOptions> {
    const connectionStr = this.boot.get<string>(this.configKey);
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
