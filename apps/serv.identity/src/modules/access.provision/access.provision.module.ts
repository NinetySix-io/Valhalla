import { AccessJwtConfigService } from '@app/services/access.jwt.config.service';
import { AccessProvisionService } from './access.provision.service';
import { AccountSchema } from '@app/entities/accounts/schema';
import { AccountsModel } from '@app/entities/accounts';
import { BootConfigService } from '@app/services/boot.config.service';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { OrgsRpcClientService } from '@valhalla/serv.clients';
import { RefreshTokenSchema } from '@app/entities/refresh.tokens/schema';
import { RefreshTokensModel } from '@app/entities/refresh.tokens';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  providers: [
    RefreshTokensModel,
    AccountsModel,
    AccessProvisionService,
    BootConfigService,
    OrgsRpcClientService,
  ],
  exports: [AccessProvisionService],
  imports: [
    JwtModule.registerAsync({ useClass: AccessJwtConfigService }),
    TypegooseModule.forFeature([RefreshTokenSchema, AccountSchema]),
  ],
})
export class AccessProvisionModule {}
