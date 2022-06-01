import {
  CoreModule,
  MongoConfigService,
  ServiceRegistryModule,
} from '@valhalla/serv.core';

import { ApiModule } from './api/api.module';
import { BootModule } from '@nestcloud2/boot';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { configFilePath } from './constants';
import { gRpcModule } from './grpc/grpc.module';

@Module({
  imports: [
    CoreModule,
    ServiceRegistryModule,
    BootModule.forRoot({ filePath: configFilePath }),
    TypegooseModule.forRootAsync({ useClass: MongoConfigService }),
    gRpcModule,
    ApiModule,
  ],
})
export class AppModule {}
