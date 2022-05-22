import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { UpdateRequest, UpdateResponse } from '@app/rpc/protobuf/users';

import { RpcHandler } from '@valhalla/serv.core';
import { SStruct } from '@valhalla/utilities';
import { UserTransformer } from '@app/entities/users/transformer';
import { UserUpdatedEvent } from '../events/user.updated.event';
import { UsersModel } from '@app/entities/users';
import { isEmpty } from 'class-validator';

export class UpdateAccountCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly data: Partial<UpdateRequest>,
  ) {}
}

@CommandHandler(UpdateAccountCommand)
@RpcHandler()
export class UpdateAccountHandler
  implements ICommandHandler<UpdateAccountCommand, UpdateResponse>
{
  constructor(
    private readonly users: UsersModel,
    private readonly eventBus: EventBus,
  ) {}

  private validateRequest(data: Partial<UpdateRequest>) {
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

  async execute(command: UpdateAccountCommand): Promise<UpdateResponse> {
    const payload = this.validateRequest(command.data);
    const user = await this.users.findOneAndUpdate(
      { _id: command.userId },
      payload,
      { new: true },
    );

    if (!user) {
      throw new Error('User not found');
    }

    const userProto = new UserTransformer(user).proto;
    this.eventBus.publish(new UserUpdatedEvent(userProto));

    return {
      user: userProto,
    };
  }
}
