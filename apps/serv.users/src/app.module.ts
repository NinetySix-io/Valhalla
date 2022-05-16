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
import { RpcUsersModule } from './rpc/users/users.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { configFilePath } from './constants';

@Module({
  imports: [
    ServiceRegistryModule,
    CoreModule,
    BootModule.forRoot({ filePath: configFilePath }),
    TypegooseModule.forRootAsync({ useClass: MongoConfigService }),
    RpcUsersModule,
    RestHealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
