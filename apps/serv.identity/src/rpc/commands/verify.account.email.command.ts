import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';

import { AccountTransformer } from '@app/entities/accounts/transformer';
import { AccountsModel } from '@app/entities/accounts';
import { EmailVerifiedEvent } from '../events/email.verified.event';
import { RpcHandler } from '@valhalla/serv.core';
import { VerifyAccountEmailResponse } from '@app/rpc/protobuf';

export class VerifyAccountEmailCommand implements ICommand {
  constructor(public readonly code: string, public readonly email: string) {}
}

@CommandHandler(VerifyAccountEmailCommand)
@RpcHandler()
export class VerifyAccountEmailHandler
  implements
    ICommandHandler<VerifyAccountEmailCommand, VerifyAccountEmailResponse>
{
  constructor(
    private readonly accounts: AccountsModel,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: VerifyAccountEmailCommand,
  ): Promise<VerifyAccountEmailResponse> {
    const user = await this.accounts
      .findByUsername(command.email)
      .orFail(() => new Error('Account not found!'));

    const verifiedEmail = user.emails.find(
      (email) => email.verificationCode === command.code,
    );

    if (!user || !verifiedEmail) {
      throw Error('Invalid verification code');
    }

    verifiedEmail.isVerified = true;
    verifiedEmail.verificationCode = undefined;

    await user.save();

    this.eventBus.publish(
      new EmailVerifiedEvent({
        ...new AccountTransformer(user).proto,
        emailVerified: verifiedEmail.value,
      }),
    );

    return {
      success: true,
    };
  }
}
