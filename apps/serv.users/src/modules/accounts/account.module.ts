import {
  EventStoreModule,
  EventStoreSubscriptionType,
  JwtConfigService,
} from '@valhalla/serv.core';

import { AccountController } from './account.controller';
import { EmailVerifiedEvent } from '@serv.users/cqrs/events/email.verified.event';
import { ForgotAccountPasswordHandler } from '@serv.users/cqrs/commands/forgot.password.command';
import { JwtModule } from '@nestjs/jwt';
import { LoginAccountHandler } from '@serv.users/cqrs/commands/login.command';
import { Module } from '@nestjs/common';
import { RegisterAccountHandler } from '@serv.users/cqrs/commands/register.command';
import { SendAccountEmailVerificationHandler } from '@serv.users/cqrs/commands/send.email.verification.command';
import { UpdateAccountHandler } from '@serv.users/cqrs/commands/update.command';
import { UpdateAccountPasswordHandler } from '@serv.users/cqrs/commands/update.password.command';
import { UserLoggedInEvent } from '@serv.users/cqrs/events/user.logged.in.event';
import { UserPasswordsModel } from '@serv.users/entities/user.passwords';
import { UserRegisteredEvent } from '@serv.users/cqrs/events/user.registered.event';
import { UsersModel } from '@serv.users/entities/users';
import { VerifyAccountEmailHandler } from '@serv.users/cqrs/commands/verify.email.command';

@Module({
  imports: [
    JwtModule.registerAsync({ useClass: JwtConfigService }),
    EventStoreModule.registerFeature({
      type: 'event-store',
      featureStreamName: '$ce-account',
      subscriptions: [
        {
          type: EventStoreSubscriptionType.Volatile,
          stream: '$ce-account',
        },
        {
          type: EventStoreSubscriptionType.Volatile,
          stream: '$ce-billing',
        },
      ],
      eventHandlers: {
        UserLoggedInEvent: (data) => new UserLoggedInEvent(data),
        UserRegisteredEvent: (data) => new UserRegisteredEvent(data),
        EmailVerifiedEvent: (data) => new EmailVerifiedEvent(data),
      },
    }),
  ],
  providers: [
    UsersModel,
    UserPasswordsModel,
    ForgotAccountPasswordHandler,
    LoginAccountHandler,
    RegisterAccountHandler,
    SendAccountEmailVerificationHandler,
    UpdateAccountHandler,
    UpdateAccountPasswordHandler,
    VerifyAccountEmailHandler,
  ],
  controllers: [AccountController],
})
export class AccountModule {}
