import { BootModule } from '@nestcloud2/boot';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import {
  CoreModule,
  HttpExceptionFilter,
  MongoConfigService,
  ServiceRegistryModule,
} from '@valhalla/serv.core';
import { NestCasbinModule } from 'nestjs-casbin';
import { TypegooseModule } from 'nestjs-typegoose';
import { configFilePath } from './constants';
import { RestHealthModule } from './rest/health/health.module';
import { RpcAccessModule } from './rpc/access/access.module';
import { CasbinConfigService } from './services/casbin.config.service';

@Module({
  imports: [
    CoreModule,
    ServiceRegistryModule,
    BootModule.forRoot({ filePath: configFilePath }),
    TypegooseModule.forRootAsync({ useClass: MongoConfigService }),
    NestCasbinModule.registerAsync({ useClass: CasbinConfigService }),

    //APP
    RpcAccessModule,
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
