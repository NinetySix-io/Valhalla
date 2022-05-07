import {
  CoreModule,
  HttpExceptionFilter,
  MongoConfigService,
  ServiceRegistryModule,
} from '@valhalla/serv.core';

import { APP_FILTER } from '@nestjs/core';
import { BootModule } from '@nestcloud2/boot';
import { Module } from '@nestjs/common';
import { RestHealthModule } from './rest/health/health.module';
import { RpcTenantBillingsModule } from './rpc/tenant.billing/tenant.billings.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { configFilePath } from './constants';

@Module({
  imports: [
    CoreModule,
    ServiceRegistryModule,
    BootModule.forRoot({ filePath: configFilePath }),
    TypegooseModule.forRootAsync({ useClass: MongoConfigService }),
    RpcTenantBillingsModule,
    RestHealthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  controllers: [],
})
export class AppModule {}
