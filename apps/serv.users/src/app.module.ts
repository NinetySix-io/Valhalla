import { CoreModule, ServiceRegistryModule } from '@valhalla/serv.core/src';

import { AccountModule } from './modules/accounts/account.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ServiceRegistryModule, CoreModule, AccountModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
