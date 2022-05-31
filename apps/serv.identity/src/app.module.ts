import {
  CoreModule,
  MongoConfigService,
  ServiceRegistryModule,
} from '@valhalla/serv.core';

import { BootModule } from '@nestcloud2/boot';
import { GqlModules } from '@app/gql';
import { Module } from '@nestjs/common';
import { RestHealthModule } from './rest/health/health.module';
import { RpcModule } from './rpc/rpc.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { configFilePath } from './constants';

@Module({
  imports: [
    ServiceRegistryModule,
    CoreModule,
    BootModule.forRoot({ filePath: configFilePath }),
    TypegooseModule.forRootAsync({ useClass: MongoConfigService }),
    RpcModule,
    RestHealthModule,
    ...GqlModules,
  ],
})
export class AppModule {}
