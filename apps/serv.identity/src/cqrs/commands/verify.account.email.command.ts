import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  VerifyAccountEmailRequest,
  VerifyAccountEmailResponse,
} from '@app/protobuf';

import { AccountTransformer } from '@app/entities/accounts/transformer';
import { AccountsModel } from '@app/entities/accounts';
import { EmailVerifiedEvent } from '../events/email.verified.event';
import { RpcHandler } from '@valhalla/serv.core';
import { VerificationsModel } from '@app/entities/verifications';

export class VerifyAccountEmailCommand implements ICommand {
  constructor(readonly request: VerifyAccountEmailRequest) {}
}

@CommandHandler(VerifyAccountEmailCommand)
@RpcHandler()
export class VerifyAccountEmailHandler
  implements
    ICommandHandler<VerifyAccountEmailCommand, VerifyAccountEmailResponse>
{
  constructor(
    private readonly accounts: AccountsModel,
    private readonly verifications: VerificationsModel,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: VerifyAccountEmailCommand,
  ): Promise<VerifyAccountEmailResponse> {
    const { email, verificationCode, accountId } = command.request;

    const account = await this.accounts
      .findById(accountId)
      .orFail(() => new Error('Account not found!'));

    const accountEmail = account.emails.find((item) => item.value === email);
    if (!accountEmail) {
      throw new Error('Email is not associated with this account!');
    }

    const verification = await this.verifications
      .findById(accountEmail.verification)
      .orFail(() => new Error('Verification not found!'));

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
        ...new AccountTransformer(account).proto,
        emailVerified: accountEmail.value,
      }),
    );

    return {
      verificationId: verification.id,
    };
  }
}
