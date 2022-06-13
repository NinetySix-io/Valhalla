import { Account, AddPhoneToAccountRequest, Verification } from '@app/protobuf';
import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { AccountTransformer } from '@app/entities/accounts/transformer';
import { AccountsModel } from '@app/entities/accounts';
import { PhoneAddedToAccountEvent } from '../events/phone.added.to.account.event';
import { SendPhoneVerificationCommand } from './send.phone.verification.command';

export class AddPhoneToAccountCommand implements ICommand {
  constructor(public readonly request: AddPhoneToAccountRequest) {}
}

@CommandHandler(AddPhoneToAccountCommand)
@RpcHandler()
export class AddPhoneToAccountHandler
  implements ICommandHandler<AddPhoneToAccountCommand, Account>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
    private readonly accounts: AccountsModel,
  ) {}

  async execute(command: AddPhoneToAccountCommand): Promise<Account> {
    const isTaken = await this.accounts.isPhoneTaken(command.request.phone);
    if (isTaken) {
      throw new Error('This phone number is associated with another account!');
    }

    const account = await this.accounts
      .findById(command.request.accountId)
      .orFail(() => new Error('Account not found!'));

    const primaryPhone = account.phones.find((phone) => phone.isPrimary);
    if (!primaryPhone?.isVerified) {
      throw new Error('Primary phone number is not verified!');
    }

    let isAdded = false;
    const isAlreadyAdded = account.phones.find(
      (phone) => phone.value === command.request.phone,
    );

    if (!isAlreadyAdded) {
      const verification: Verification = await this.commandBus.execute(
        new SendPhoneVerificationCommand({
          phone: command.request.phone,
        }),
      );

      account.phones.push({
        value: command.request.phone,
        isVerified: false,
        isPrimary: false,
        verification: toObjectId(verification.id),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await account.save();
      isAdded = true;
    }

    const serialized = new AccountTransformer(account).proto;

    if (isAdded) {
      this.eventBus.publish(
        new PhoneAddedToAccountEvent(command.request.phone, serialized),
      );
    }

    return serialized;
  }
}
