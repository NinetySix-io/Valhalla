import { AccessProvisionModule } from '@app/modules/access.provision/access.provision.module';
import { AccountLoginHandler } from './commands/account.login.command';
import { AccountLogoutHandler } from './commands/account.logout.command';
import { AccountRegisterHandler } from '@app/rpc/commands/account.register.command';
import { AccountSchema } from '@app/entities/accounts/schema';
import { AccountsModel } from '@app/entities/accounts';
import { BootConfigService } from '@app/services/boot.config.service';
import { CreateAccessHandler } from './commands/create.access.command';
import { DecodeAccessTokenHandler } from './commands/decode.access.token.command';
import { DeleteRefreshTokenHandler } from './commands/delete.refresh.token.command';
import { ForgotAccountPasswordHandler } from '@app/rpc/commands/forgot.account.password.command';
import { Module } from '@nestjs/common';
import { PasswordSchema } from '@app/entities/passwords/schema';
import { PasswordsModel } from '@app/entities/passwords';
import { ProvisionAccessTokenHandler } from './commands/provision.access.token.command';
import { RefreshTokenSchema } from '@app/entities/refresh.tokens/schema';
import { RefreshTokensModel } from '@app/entities/refresh.tokens';
import { RpcController } from './rpc.controller';
import { SendAccountEmailVerificationHandler } from '@app/rpc/commands/send.account.email.verification.command';
import { TypegooseModule } from 'nestjs-typegoose';
import { UpdateAccountHandler } from '@app/rpc/commands/update.account.command';
import { UpdateAccountPasswordHandler } from '@app/rpc/commands/update.account.password.command';
import { VerifyAccountEmailHandler } from '@app/rpc/commands/verify.account.email.command';

@Module({
  imports: [
    AccessProvisionModule,
    TypegooseModule.forFeature([
      AccountSchema,
      PasswordSchema,
      RefreshTokenSchema,
    ]),
  ],
  providers: [
    BootConfigService,

    // DATABASE MODELS
    AccountsModel,
    PasswordsModel,
    RefreshTokensModel,

    // HANDLERS
    AccountLoginHandler,
    AccountLogoutHandler,
    AccountRegisterHandler,
    CreateAccessHandler,
    DecodeAccessTokenHandler,
    DeleteRefreshTokenHandler,
    ForgotAccountPasswordHandler,
    ProvisionAccessTokenHandler,
    SendAccountEmailVerificationHandler,
    UpdateAccountHandler,
    UpdateAccountPasswordHandler,
    VerifyAccountEmailHandler,
  ],
  controllers: [RpcController],
})
export class RpcModule {}
