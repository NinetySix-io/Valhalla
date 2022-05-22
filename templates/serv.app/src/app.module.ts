import { CoreModule, ServiceRegistryModule } from '@valhalla/serv.core';

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
})
export class AppModule {}
