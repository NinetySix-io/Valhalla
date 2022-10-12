import { Account, RemovePhoneFromAccountRequest } from '@app/protobuf';
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
import { PhoneRemovedFromAccountEvent } from '../events/phone.removed.from.account.event';

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
    const accountId = toObjectId(command.request.accountId);
    const phoneId = toObjectId(command.request.phoneId);
    const account = await this.accounts
      .findOneAndUpdate(
        { _id: accountId, 'phones._id': phoneId },
        { $pull: { phones: { _id: phoneId } } },
      )
      .lean()
      .orFail();

    const phone = account.phones.find(compareObjectId(phoneId));
    const serialized = Serializer.from(AccountProto).serialize(account);

    if (!phone) {
      throw new Error('Unexpected error!');
    }

    this.eventBus.publish(
      new PhoneRemovedFromAccountEvent(phone.value, serialized),
    );

    return serialized;
  }
}
