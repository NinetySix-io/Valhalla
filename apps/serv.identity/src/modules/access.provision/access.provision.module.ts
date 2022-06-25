import { Global, Module } from '@nestjs/common';

import { AccessJwtConfigService } from '@app/services/access.jwt.config.service';
import { AccessProvisionService } from './access.provision.service';
import { AccountSchema } from '@app/entities/accounts/schema';
import { BootConfigService } from '@app/services/boot.config.service';
import { JwtModule } from '@nestjs/jwt';
import { OrgsRpcClientService } from '@valhalla/serv.clients';
import { RefreshTokenSchema } from '@app/entities/refresh.tokens/schema';
import { TypegooseModule } from 'nestjs-typegoose';

@Global()
@Module({
  providers: [BootConfigService, AccessProvisionService, OrgsRpcClientService],
  exports: [AccessProvisionService],
  imports: [
    JwtModule.registerAsync({ useClass: AccessJwtConfigService }),
    TypegooseModule.forFeature([RefreshTokenSchema, AccountSchema]),
  ],
})
export class AccessProvisionModule {}
