import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { LoginRequest, LoginResponse } from '@app/rpc/protobuf/users';

import { Logger } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';
import { UserLoggedInEvent } from '../events/user.logged.in.event';
import { UserPasswordsModel } from '@app/entities/user.passwords';
import { UserTransformer } from '@app/entities/users/transformer';
import { UsersModel } from '@app/entities/users';

export class LoginAccountCommand implements ICommand {
  constructor(public readonly cmd: LoginRequest) {}
}

@CommandHandler(LoginAccountCommand)
@RpcHandler()
export class LoginAccountHandler
  implements ICommandHandler<LoginAccountCommand, LoginResponse>
{
  private readonly logger = new Logger(LoginAccountHandler.name);

  constructor(
    private readonly users: UsersModel,
    private readonly userPasswords: UserPasswordsModel,
    private readonly eventBus: EventBus,
  ) {}

  private get LoginError() {
    return new Error('Username or password mismatch!');
  }

  async execute(command: LoginAccountCommand): Promise<LoginResponse> {
    const { username, password } = command.cmd;
    const user = await this.users.findByUsername(username);

    if (!user) {
      this.logger.debug('User not found!', username);
      throw this.LoginError;
    }

    const userPassword = await this.userPasswords
      .findOne({ user: user._id })
      .orFail();

    const isValid = await this.userPasswords.validatePassword(
      password,
      userPassword.hashed,
    );

    if (!isValid) {
      this.logger.debug('User password mismatch!');
      throw this.LoginError;
    }

    const userProto = new UserTransformer(user).proto;
    const event = new UserLoggedInEvent(userProto);
    this.eventBus.publish(event);

    return {
      user: userProto,
      session: undefined,
    };
  }
}
