import * as yup from 'yup';

import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { UpdateRequest, UpdateResponse } from '@app/rpc/protobuf/users';

import { RpcHandler } from '@valhalla/serv.core';
import { UserTransformer } from '@app/entities/users/transformer';
import { UserUpdatedEvent } from '../events/user.updated.event';
import { UsersModel } from '@app/entities/users';

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

  async execute(command: UpdateAccountCommand): Promise<UpdateResponse> {
    const payload = await yup
      .object()
      .shape({
        displayName: yup.string(),
        firstName: yup.string(),
        lastName: yup.string().nullable(true),
      })
      .validate(command.data, {
        strict: true,
        stripUnknown: true,
      });

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
