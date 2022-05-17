import {
  CoreModule,
  HttpExceptionFilter,
  ServiceRegistryModule,
} from '@valhalla/serv.core';

import { APP_FILTER } from '@nestjs/core';
import { BootModule } from '@nestcloud2/boot';
import { Module } from '@nestjs/common';
import { RestHealthModule } from './rest/health/health.module';
import { configFilePath } from './constants';

@Module({
  imports: [
    CoreModule,
    ServiceRegistryModule,
    BootModule.forRoot({ filePath: configFilePath }),
    RestHealthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
