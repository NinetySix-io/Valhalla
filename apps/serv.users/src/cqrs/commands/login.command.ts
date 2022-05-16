import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { LoginRequest, LoginResponse } from '@serv.users/protobuf/user';

import { RpcHandler } from '@valhalla/serv.core';
import { UserLoggedInEvent } from '../events/user.logged.in.event';
import { UserPasswordsModel } from '@serv.users/entities/user.passwords';
import { UserTransformer } from '@serv.users/entities/users/transformer';
import { UsersModel } from '@serv.users/entities/users';

export class LoginAccountCommand implements ICommand {
  constructor(public readonly cmd: LoginRequest) {}
}

@CommandHandler(LoginAccountCommand)
@RpcHandler()
export class LoginAccountHandler
  implements ICommandHandler<LoginAccountCommand, LoginResponse>
{
  constructor(
    private readonly users: UsersModel,
    private readonly userPasswords: UserPasswordsModel,
    private readonly eventBus: EventBus,
  ) {}

  private get LoginError() {
    return new Error('Username or password mismatch!');
  }

  async execute(command: LoginAccountCommand): Promise<LoginResponse> {
    const { username, password } = command.cmd.params;
    const user = await this.users.findByUsername(username);

    if (!user) {
      throw this.LoginError;
    }

    const userPassword = await this.userPasswords.findOne({ user: user._id });
    const isValid = await this.userPasswords.validatePassword(
      password,
      userPassword.hashed,
    );

    if (!isValid) {
      throw this.LoginError;
    }

    this.eventBus.publish(new UserLoggedInEvent(user));

    return {
      user: new UserTransformer(user).proto,
      session: undefined,
    };
  }
}
