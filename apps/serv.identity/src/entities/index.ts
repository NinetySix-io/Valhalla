import { Global, Module } from '@nestjs/common';

import { AccountSchema } from '@app/entities/accounts/schema';
import { AccountsModel } from '@app/entities/accounts';
import { BootConfigService } from '@app/services/boot.config.service';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { RefreshTokenSchema } from '@app/entities/refresh.tokens/schema';
import { RefreshTokensModel } from '@app/entities/refresh.tokens';
import { TypegooseModule } from 'nestjs-typegoose';
import { VerificationSchema } from '@app/entities/verifications/schema';
import { VerificationsModel } from '@app/entities/verifications';

const ModelProviders: ModuleMetadata['providers'] = [
  AccountsModel,
  VerificationsModel,
  RefreshTokensModel,
];

@Global()
@Module({
  imports: [
    TypegooseModule.forFeature([
      AccountSchema,
      VerificationSchema,
      RefreshTokenSchema,
    ]),
  ],
  providers: [BootConfigService, ...ModelProviders],
  exports: [...ModelProviders],
})
export class DbEntitiesModule {}
