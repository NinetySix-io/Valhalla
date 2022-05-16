import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  UpdatePasswordRequest,
  UpdatePasswordResponse,
} from '@serv.users/protobuf/user';

import { RpcHandler } from '@valhalla/serv.core';
import { UserPasswordUpdatedEvent } from '../events/user.password.updated.event';
import { UserPasswordsModel } from '@serv.users/entities/user.passwords';
import { UsersModel } from '@serv.users/entities/users';
import mongoose from 'mongoose';

export class UpdateAccountPasswordCommand implements ICommand {
  constructor(public readonly cmd: Partial<UpdatePasswordRequest>) {}
}

@CommandHandler(UpdateAccountPasswordCommand)
@RpcHandler()
export class UpdateAccountPasswordHandler
  implements
    ICommandHandler<UpdateAccountPasswordCommand, UpdatePasswordResponse>
{
  constructor(
    private readonly users: UsersModel,
    private readonly passwords: UserPasswordsModel,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: UpdateAccountPasswordCommand,
  ): Promise<UpdatePasswordResponse> {
    if (command.cmd.newPassword !== command.cmd.confirmPassword) {
      throw new Error('Password confirmation do not match!');
    }

    const userId = new mongoose.Types.ObjectId(command.cmd.userId);
    const password = await this.passwords.findOne({ user: userId });
    if (!password) {
      throw new Error('User not found!');
    }

    const isValidOldPassword = await this.passwords.validatePassword(
      command.cmd.oldPassword,
      password.hashed,
    );

    if (!isValidOldPassword) {
      throw new Error('Incorrect current password entered!');
    }

    const user = await this.users.findById(userId);
    await this.passwords.updatePassword(userId, command.cmd.newPassword);
    await this.eventBus.publish(new UserPasswordUpdatedEvent(user));

    return {
      success: true,
    };
  }
}
