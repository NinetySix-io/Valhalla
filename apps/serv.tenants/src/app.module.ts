import { CoreModule, ServiceRegistryModule } from '@valhalla/serv.core';

import { Module } from '@nestjs/common';
import { TenantsModule } from './modules/tenants.module';

@Module({
  imports: [TenantsModule, CoreModule, ServiceRegistryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
