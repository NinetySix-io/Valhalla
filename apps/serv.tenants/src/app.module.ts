import {
  CoreModule,
  MongoConfigService,
  ServiceRegistryModule,
} from '@valhalla/serv.core';

import { BootModule } from '@nestcloud2/boot';
import { Module } from '@nestjs/common';
import { RestHealthModule } from './rest/health/health.module';
import { RpcTenantsModule } from './rpc/tenants/tenants.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { configFilePath } from './constants';

@Module({
  imports: [
    CoreModule,
    ServiceRegistryModule,
    BootModule.forRoot({ filePath: configFilePath }),
    TypegooseModule.forRootAsync({ useClass: MongoConfigService }),
    RpcTenantsModule,
    RestHealthModule,
  ],
})
export class AppModule {}
