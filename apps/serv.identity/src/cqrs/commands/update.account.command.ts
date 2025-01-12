import * as Struct from 'superstruct';

import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, Serializer } from '@valhalla/serv.core';
import { UpdateAccountRequest, UpdateAccountResponse } from '@app/protobuf';

import { AccountProto } from '../protos/account.proto';
import { AccountUpdatedEvent } from '../events/account.updated.event';
import { AccountsModel } from '@app/entities/accounts';
import isEmpty from 'lodash.isempty';

export class UpdateAccountCommand implements ICommand {
  constructor(public readonly request: UpdateAccountRequest) {}
}

@CommandHandler(UpdateAccountCommand)
@RpcHandler()
export class UpdateAccountHandler
  implements ICommandHandler<UpdateAccountCommand, UpdateAccountResponse>
{
  constructor(
    private readonly accounts: AccountsModel,
    private readonly eventBus: EventBus,
  ) {}

  private validateRequest(data: Partial<UpdateAccountRequest>) {
    const schema: Struct.Describe<typeof data> = Struct.object({
      displayName: Struct.optional(Struct.string()),
      firstName: Struct.optional(Struct.string()),
      lastName: Struct.optional(Struct.string()),
    });

    const payload = Struct.create(data, schema);
    if (isEmpty(payload)) {
      throw new Error('Must specified at least 1 property');
    }

    return payload;
  }

  async execute(command: UpdateAccountCommand): Promise<UpdateAccountResponse> {
    const { accountId, ...rest } = command.request;
    const payload = this.validateRequest(rest);
    const user = await this.accounts
      .findOneAndUpdate({ _id: accountId }, payload, { new: true })
      .lean()
      .orFail();

    const userProto = Serializer.from(AccountProto).serialize(user);
    this.eventBus.publish(new AccountUpdatedEvent(userProto));

    return {
      updatedAccount: userProto,
    };
  }
}
