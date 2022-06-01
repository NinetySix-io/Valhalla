import { Global, Module } from '@nestjs/common';

import { AuthModule } from './auth.module';
import { CqrsModule } from '@nestjs/cqrs';
import { IdentityRpcClientService } from '@valhalla/serv.clients';

@Global()
@Module({
  imports: [CqrsModule, AuthModule],
  exports: [CqrsModule],
  providers: [IdentityRpcClientService],
})
export class CoreModule {}
