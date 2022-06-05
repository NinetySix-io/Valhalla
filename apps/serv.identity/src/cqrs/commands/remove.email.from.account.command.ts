import { Account, RemoveEmailFromAccountRequest } from '@app/protobuf';
import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';

import { AccountTransformer } from '@app/entities/accounts/transformer';
import { AccountsModel } from '@app/entities/accounts';
import { EmailRemovedFromAccountEvent } from '../events/email.removed.from.account.event';
import { RpcHandler } from '@valhalla/serv.core';

export class RemoveEmailFromAccountCommand implements ICommand {
  constructor(public readonly request: RemoveEmailFromAccountRequest) {}
}

@CommandHandler(RemoveEmailFromAccountCommand)
@RpcHandler()
export class RemoveEmailFromAccountHandler
  implements ICommandHandler<RemoveEmailFromAccountCommand, Account>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly accounts: AccountsModel,
  ) {}

  async execute(command: RemoveEmailFromAccountCommand): Promise<Account> {
    const account = await this.accounts
      .findById(command.request.accountId)
      .orFail(() => new Error('Account not found!'));

    let originalLen = account.emails.length;
    account.emails = account.emails.filter(
      (email) => !email.isPrimary && email.value !== command.request.email,
    );

    const hasRemoval = originalLen !== account.emails.length;
    const serialized = new AccountTransformer(account).proto;

    if (hasRemoval) {
      await account.save();
      this.eventBus.publish(
        new EmailRemovedFromAccountEvent(command.request.email, serialized),
      );
    }

    return serialized;
  }
}
