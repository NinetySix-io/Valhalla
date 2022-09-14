import { Global, Module } from '@nestjs/common';

import { AccessJwtConfigService } from '@app/services/access.jwt.config.service';
import { AccessProvisionService } from './access.provision.service';
import { BootConfigService } from '@app/services/boot.config.service';
import { DbEntitiesModule } from '@app/entities';
import { JwtModule } from '@nestjs/jwt';
import { OrgsRpcClientService } from '@valhalla/serv.clients';

@Global()
@Module({
  providers: [BootConfigService, AccessProvisionService, OrgsRpcClientService],
  exports: [AccessProvisionService],
  imports: [
    DbEntitiesModule,
    JwtModule.registerAsync({
      useClass: AccessJwtConfigService,
    }),
  ],
})
export class AccessProvisionModule {}
