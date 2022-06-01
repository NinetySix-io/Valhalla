import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { UpdateAccountRequest, UpdateAccountResponse } from '@app/protobuf';

import { AccountTransformer } from '@app/entities/accounts/transformer';
import { AccountUpdatedEvent } from '../events/account.updated.event';
import { AccountsModel } from '@app/entities/accounts';
import { RpcHandler } from '@valhalla/serv.core';
import { SStruct } from '@valhalla/utilities';
import { isEmpty } from 'class-validator';

export class UpdateAccountCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly data: Partial<UpdateAccountRequest>,
  ) {}
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
    const schema: SStruct.Describe<typeof data> = SStruct.object({
      displayName: SStruct.optional(SStruct.string()),
      firstName: SStruct.optional(SStruct.string()),
      lastName: SStruct.optional(SStruct.string()),
    });

    const payload = SStruct.create(data, schema);
    if (isEmpty(payload)) {
      throw new Error('Must specified at least 1 property');
    }

    return payload;
  }

  async execute(command: UpdateAccountCommand): Promise<UpdateAccountResponse> {
    const payload = this.validateRequest(command.data);
    const user = await this.accounts.findOneAndUpdate(
      { _id: command.userId },
      payload,
      { new: true },
    );

    if (!user) {
      throw new Error('User not found');
    }

    const userProto = new AccountTransformer(user).proto;
    this.eventBus.publish(new AccountUpdatedEvent(userProto));

    return {
      updatedAccount: userProto,
    };
  }
}