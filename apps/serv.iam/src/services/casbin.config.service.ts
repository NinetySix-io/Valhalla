import {
  NestCasbinModuleOptions,
  NestCasbinOptionsFactory,
} from 'nestjs-casbin';

import { Environment } from '@serv.iam/environment';
import { Injectable } from '@nestjs/common';
import { MongoAdapter } from 'casbin-mongodb-adapter';

@Injectable()
export class CasbinConfigService implements NestCasbinOptionsFactory {
  async createCasbinOptions(): Promise<NestCasbinModuleOptions> {
    const adapter = await MongoAdapter.newAdapter({
      uri: Environment.variables.DATABASE_URL,
      collection: 'casbin',
      database: 'iam',
    });

    return {
      adapter,
      model: 'casbin',
    };
  }
}
