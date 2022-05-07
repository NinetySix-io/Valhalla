import { CoreModule, ServiceRegistryModule } from '@valhalla/serv.core';

import { CasbinConfigService } from './services/casbin.config.service';
import { Module } from '@nestjs/common';
import { NestCasbinModule } from 'nestjs-casbin';

@Module({
  imports: [
    ServiceRegistryModule,
    CoreModule,
    NestCasbinModule.registerAsync({
      useClass: CasbinConfigService,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
