import {
  CoreModule,
  GqlModule,
  ServiceRegistryModule,
} from '@valhalla/serv.core';

import { ApiModule } from './api/api.module';
import { BootConfigService } from '@app/services/boot.config.service';
import { BootModule } from '@nestcloud2/boot';
import { ConfigModule } from '@app/modules/config.module';
import { KindagooseModule } from 'kindagoose';
import { Module } from '@nestjs/common';
import { configFilePath } from './constants';
import { gRpcModule } from './grpc/grpc.module';

@Module({
  imports: [
    ServiceRegistryModule,
    CoreModule,
    GqlModule,
    gRpcModule,
    ApiModule,
    BootModule.forRoot({
      filePath: configFilePath,
    }),
    KindagooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [BootConfigService],
      useFactory(config: BootConfigService) {
        return {
          uri: config.mongodbUri,
        };
      },
    }),
  ],
})
export class AppModule {}
