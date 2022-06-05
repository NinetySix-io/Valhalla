import { AccessProvisionModule } from '@app/modules/access.provision/access.provision.module';
import { AccountSchema } from '@app/entities/accounts/schema';
import { AccountsModel } from '@app/entities/accounts';
import { BootConfigService } from '@app/services/boot.config.service';
import { CreateAccessHandler } from '@app/cqrs/commands/create.access.command';
import { DecodeAccessTokenHandler } from '@app/cqrs/commands/decode.access.token.command';
import { DeleteRefreshTokenHandler } from '@app/cqrs/commands/delete.refresh.token.command';
import { EmailVerifiedSaga } from '@app/cqrs/sagas/email.verified.saga';
import { FindAccountHandler } from '@app/cqrs/queries/find.account.query';
import { LoginWithEmailHandler } from '@app/cqrs/commands/login.with.email.command';
import { LoginWithPhoneHandler } from '@app/cqrs/commands/login.with.phone.command';
import { LogoutHandler } from '@app/cqrs/commands/logout.command';
import { Module } from '@nestjs/common';
import { PhoneVerifiedSaga } from '@app/cqrs/sagas/phone.verified.saga';
import { ProvisionAccessTokenHandler } from '@app/cqrs/commands/provision.access.token.command';
import { RefreshTokenSchema } from '@app/entities/refresh.tokens/schema';
import { RefreshTokensModel } from '@app/entities/refresh.tokens';
import { RegisterHandler } from '@app/cqrs/commands/register.command';
import { SendEmailVerificationHandler } from '@app/cqrs/commands/send.email.verification.command';
import { TypegooseModule } from 'nestjs-typegoose';
import { UpdateAccountHandler } from '@app/cqrs/commands/update.account.command';
import { VerificationSchema } from '@app/entities/verifications/schema';
import { VerificationsModel } from '@app/entities/verifications';
import { VerifyEmailHandler } from '@app/cqrs/commands/verify.email.command';
import { VerifyPhoneHandler } from '@app/cqrs/commands/verify.phone.command';
import { gRpcController } from './grpc.controller';

@Module({
  imports: [
    AccessProvisionModule,
    TypegooseModule.forFeature([
      AccountSchema,
      VerificationSchema,
      RefreshTokenSchema,
    ]),
  ],
  providers: [
    BootConfigService,

    AccountsModel,
    VerificationsModel,
    RefreshTokensModel,

    CreateAccessHandler,
    DecodeAccessTokenHandler,
    DeleteRefreshTokenHandler,
    LoginWithEmailHandler,
    LoginWithPhoneHandler,
    LogoutHandler,
    ProvisionAccessTokenHandler,
    RegisterHandler,
    SendEmailVerificationHandler,
    UpdateAccountHandler,
    VerifyEmailHandler,
    VerifyPhoneHandler,

    FindAccountHandler,

    EmailVerifiedSaga,
    PhoneVerifiedSaga,
  ],
  controllers: [gRpcController],
})
export class gRpcModule {}
