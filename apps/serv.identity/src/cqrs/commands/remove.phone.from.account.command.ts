import { Account, RemovePhoneFromAccountRequest } from '@app/protobuf';
import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';

import { AccountTransformer } from '@app/entities/accounts/transformer';
import { AccountsModel } from '@app/entities/accounts';
import { PhoneRemovedFromAccountEvent } from '../events/phone.removed.from.account.event';
import { RpcHandler } from '@valhalla/serv.core';

export class RemovePhoneFromAccountCommand implements ICommand {
  constructor(public readonly request: RemovePhoneFromAccountRequest) {}
}

@CommandHandler(RemovePhoneFromAccountCommand)
@RpcHandler()
export class RemovePhoneFromAccountHandler
  implements ICommandHandler<RemovePhoneFromAccountCommand, Account>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly accounts: AccountsModel,
  ) {}

  async execute(command: RemovePhoneFromAccountCommand): Promise<Account> {
    const account = await this.accounts
      .findById(command.request.accountId)
      .orFail(() => new Error('Account not found!'));

    let originalLen = account.emails.length;
    account.phones = account.emails.filter(
      (phone) => !phone.isPrimary && phone.value !== command.request.phone,
    );

    const hasRemoval = originalLen !== account.emails.length;
    const serialized = new AccountTransformer(account).proto;

    if (hasRemoval) {
      await account.save();
      this.eventBus.publish(
        new PhoneRemovedFromAccountEvent(command.request.phone, serialized),
      );
    }

    return serialized;
  }
}
