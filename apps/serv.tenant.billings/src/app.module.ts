import {
  CoreModule,
  MongoConfigService,
  ServiceRegistryModule,
} from '@valhalla/serv.core';

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
})
export class AppModule {}
