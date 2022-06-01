import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  SendAccountVerificationCodeRequest,
  SendAccountVerificationCodeResponse,
} from '@app/protobuf';

import { AccountSchema } from '@app/entities/accounts/schema';
import { AccountTransformer } from '@app/entities/accounts/transformer';
import { AccountsModel } from '@app/entities/accounts';
import { ArrayElement } from '@valhalla/utilities';
import { EmailVerificationSentEvent } from '../events/email.verification.sent.event';
import { RpcHandler } from '@valhalla/serv.core';
import { generateVerificationCode } from '@app/lib/generate.verification.code';

export class SendAccountEmailVerificationCommand implements ICommand {
  constructor(public readonly input: SendAccountVerificationCodeRequest) {}
}

@CommandHandler(SendAccountEmailVerificationCommand)
@RpcHandler()
export class SendAccountEmailVerificationHandler
  implements
    ICommandHandler<
      SendAccountEmailVerificationCommand,
      SendAccountVerificationCodeResponse
    >
{
  constructor(
    private readonly accounts: AccountsModel,
    private readonly eventBus: EventBus,
  ) {}

  /**
   * // TODO
   * Build verification url
   */
  private async getVerificationUrl(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    account: AccountSchema,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    email: ArrayElement<AccountSchema['emails']>,
  ): Promise<string> {
    return await Promise.resolve('TODO');
  }

  async execute(
    command: SendAccountEmailVerificationCommand,
  ): Promise<SendAccountVerificationCodeResponse> {
    const account = await this.accounts
      .findByUsername(command.input.email)
      .orFail(() => new Error('Email not found!'));

    const email = account.emails.find((e) => e.value === command.input.email);

    if (!email) {
      throw new Error('Email not found!');
    } else if (email.isVerified) {
      throw new Error('Email is already verified!');
    }

    const userProto = new AccountTransformer(account).proto;
    email.verificationCode = generateVerificationCode(6);
    const activationLink = await this.getVerificationUrl(account, email);

    account.save();
    this.eventBus.publish(
      new EmailVerificationSentEvent(userProto, activationLink),
    );

    return {
      code: email.verificationCode,
    };
  }
}
