import * as yup from 'yup';

import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { UpdateRequest, UpdateResponse } from '@serv.users/protobuf/user';

import { RpcHandler } from '@valhalla/serv.core/src';
import { UserTransformer } from '@serv.users/entities/users/transformer';
import { UserUpdatedEvent } from '../events/user.updated.event';
import { UsersModel } from '@serv.users/entities/users';

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

    this.eventBus.publish(new UserUpdatedEvent(user));
    const response = new UserTransformer(user).proto;

    return {
      user: response,
    };
  }
}
