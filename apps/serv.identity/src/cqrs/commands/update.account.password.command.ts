import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { UpdatePasswordRequest, UpdatePasswordResponse } from '@app/protobuf';

import { AccountPasswordUpdatedEvent } from '../events/account.password.updated.event';
import { AccountTransformer } from '@app/entities/accounts/transformer';
import { AccountsModel } from '@app/entities/accounts';
import { PasswordsModel } from '@app/entities/passwords';
import { RpcHandler } from '@valhalla/serv.core';
import mongoose from 'mongoose';

export class UpdateAccountPasswordCommand implements ICommand {
  constructor(public readonly cmd: UpdatePasswordRequest) {}
}

@CommandHandler(UpdateAccountPasswordCommand)
@RpcHandler()
export class UpdateAccountPasswordHandler
  implements
    ICommandHandler<UpdateAccountPasswordCommand, UpdatePasswordResponse>
{
  constructor(
    private readonly accounts: AccountsModel,
    private readonly passwords: PasswordsModel,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: UpdateAccountPasswordCommand,
  ): Promise<UpdatePasswordResponse> {
    if (command.cmd.newPassword !== command.cmd.confirmPassword) {
      throw new Error('Password confirmation do not match!');
    }

    const accountId = new mongoose.Types.ObjectId(command.cmd.accountId);
    const [password, account] = await Promise.all([
      this.passwords
        .findOne({ owner: accountId })
        .orFail(() => new Error('Account not found!')),
      this.accounts
        .findById(accountId)
        .orFail(() => new Error('Account not found!')),
    ]);

    const isValidOldPassword = await this.passwords.validatePassword(
      command.cmd.oldPassword,
      password.hashed,
    );

    if (!isValidOldPassword) {
      throw new Error('Incorrect current password entered!');
    }

    await this.passwords.updatePassword(account._id, command.cmd.newPassword);
    await this.eventBus.publish(
      new AccountPasswordUpdatedEvent(new AccountTransformer(account).proto),
    );

    return {
      success: true,
    };
  }
}
