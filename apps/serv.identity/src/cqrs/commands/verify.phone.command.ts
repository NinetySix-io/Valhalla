import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { VerifyPhoneRequest, VerifyPhoneResponse } from '@app/protobuf';

import { AccountTransformer } from '@app/entities/accounts/transformer';
import { AccountsModel } from '@app/entities/accounts';
import { PhoneVerifiedEvent } from '../events/phone.verified.event';
import { RpcHandler } from '@valhalla/serv.core';
import { VerificationsModel } from '@app/entities/verifications';

export class VerifyPhoneCommand implements ICommand {
  constructor(public readonly request: VerifyPhoneRequest) {}
}

@CommandHandler(VerifyPhoneCommand)
@RpcHandler()
export class VerifyPhoneHandler
  implements ICommandHandler<VerifyPhoneCommand, VerifyPhoneResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly accounts: AccountsModel,
    private readonly verifications: VerificationsModel,
  ) {}

  async execute(command: VerifyPhoneCommand): Promise<VerifyPhoneResponse> {
    const { phone, verificationCode, accountId } = command.request;

    const account = await this.accounts
      .findById(accountId)
      .orFail(() => new Error('Account not found!'));

    const accountPhone = account.phones.find((item) => item.value === phone);
    if (!accountPhone) {
      throw new Error('Phone number is not associated with this account!');
    }

    const verification = await this.verifications
      .findById(accountPhone.verification)
      .orFail(() => new Error('Verification not found!'));

    const isValid = await this.verifications.validateCode(
      verificationCode,
      verification.hashed,
    );

    if (!isValid) {
      throw new Error('Verification code does not match!');
    }

    accountPhone.isVerified = true;
    accountPhone.verifiedDate = new Date();
    await account.save();

    this.eventBus.publish(
      new PhoneVerifiedEvent({
        ...new AccountTransformer(account).proto,
        phoneVerified: accountPhone.value,
      }),
    );

    return {
      verificationId: verification.id,
    };
  }
}