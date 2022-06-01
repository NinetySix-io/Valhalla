import { AccessProvisionModule } from '@app/modules/access.provision/access.provision.module';
import { AccountLoginHandler } from '@app/cqrs/commands/account.login.command';
import { AccountLogoutHandler } from '@app/cqrs/commands/account.logout.command';
import { AccountRegisterHandler } from '@app/cqrs/commands/account.register.command';
import { AccountSchema } from '@app/entities/accounts/schema';
import { AccountsModel } from '@app/entities/accounts';
import { BootConfigService } from '@app/services/boot.config.service';
import { CreateAccessHandler } from '@app/cqrs/commands/create.access.command';
import { DecodeAccessTokenHandler } from '@app/cqrs/commands/decode.access.token.command';
import { DeleteRefreshTokenHandler } from '@app/cqrs/commands/delete.refresh.token.command';
import { ForgotAccountPasswordHandler } from '@app/cqrs/commands/forgot.account.password.command';
import { Module } from '@nestjs/common';
import { PasswordSchema } from '@app/entities/passwords/schema';
import { PasswordsModel } from '@app/entities/passwords';
import { ProvisionAccessTokenHandler } from '@app/cqrs/commands/provision.access.token.command';
import { RefreshTokenSchema } from '@app/entities/refresh.tokens/schema';
import { RefreshTokensModel } from '@app/entities/refresh.tokens';
import { SendAccountEmailVerificationHandler } from '@app/cqrs/commands/send.account.email.verification.command';
import { TypegooseModule } from 'nestjs-typegoose';
import { UpdateAccountHandler } from '@app/cqrs/commands/update.account.command';
import { UpdateAccountPasswordHandler } from '@app/cqrs/commands/update.account.password.command';
import { VerifyAccountEmailHandler } from '@app/cqrs/commands/verify.account.email.command';
import { gRpcController } from './grpc.controller';

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
  controllers: [gRpcController],
})
export class gRpcModule {}
