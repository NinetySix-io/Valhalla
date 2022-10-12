import { Account, RemoveEmailFromAccountRequest } from '@app/protobuf';
import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  RpcHandler,
  Serializer,
  compareObjectId,
  toObjectId,
} from '@valhalla/serv.core';

import { AccountProto } from '../protos/account.proto';
import { AccountsModel } from '@app/entities/accounts';
import { EmailRemovedFromAccountEvent } from '../events/email.removed.from.account.event';

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
    const accountId = toObjectId(command.request.accountId);
    const emailId = toObjectId(command.request.emailId);
    const account = await this.accounts
      .findOneAndUpdate(
        { _id: accountId, 'emails._id': emailId },
        { $pull: { emails: { _id: emailId } } },
      )
      .lean()
      .orFail();

    const email = account.emails.find(compareObjectId(emailId));
    if (!email) {
      throw new Error('Unexpected error!');
    }

    const serialized = Serializer.from(AccountProto).serialize(account);
    this.eventBus.publish(
      new EmailRemovedFromAccountEvent(email.value, serialized),
    );

    return serialized;
  }
}
