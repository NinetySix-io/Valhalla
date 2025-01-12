import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, Serializer } from '@valhalla/serv.core';
import { VerifyEmailRequest, VerifyEmailResponse } from '@app/protobuf';

import { AccountProto } from '../protos/account.proto';
import { AccountsModel } from '@app/entities/accounts';
import { EmailVerifiedEvent } from '../events/email.verified.event';
import { VerificationsModel } from '@app/entities/verifications';

export class VerifyEmailCommand implements ICommand {
  constructor(readonly request: VerifyEmailRequest) {}
}

@CommandHandler(VerifyEmailCommand)
@RpcHandler()
export class VerifyEmailHandler
  implements ICommandHandler<VerifyEmailCommand, VerifyEmailResponse>
{
  constructor(
    private readonly accounts: AccountsModel,
    private readonly verifications: VerificationsModel,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: VerifyEmailCommand): Promise<VerifyEmailResponse> {
    const { email, verificationCode, accountId } = command.request;

    const account = await this.accounts.findById(accountId).orFail();
    const accountEmail = account.emails.find((item) => item.value === email);
    if (!accountEmail) {
      throw new Error('Email is not associated with this account!');
    }

    const verification = await this.verifications
      .findById(accountEmail.verification)
      .lean()
      .orFail();

    const isValid = await this.verifications.validateCode(
      verificationCode,
      verification.hashed,
    );

    if (!isValid) {
      throw new Error('Verification code does not match!');
    }

    accountEmail.isVerified = true;
    accountEmail.verifiedDate = new Date();
    await account.save();

    this.eventBus.publish(
      new EmailVerifiedEvent({
        ...Serializer.from(AccountProto).serialize(account.toJSON()),
        emailVerified: accountEmail.value,
      }),
    );

    return {
      verificationId: verification.id,
    };
  }
}
