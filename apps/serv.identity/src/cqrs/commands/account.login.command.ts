import { AccountLoginRequest, AccountLoginResponse } from '@app/protobuf';
import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';

import { AccountLoggedInEvent } from '../events/account.logged.in.event';
import { AccountTransformer } from '@app/entities/accounts/transformer';
import { AccountsModel } from '@app/entities/accounts';
import { CreateAccessCommand } from './create.access.command';
import { Logger } from '@nestjs/common';
import { PasswordsModel } from '@app/entities/passwords';
import { RpcHandler } from '@valhalla/serv.core';

export class AccountLoginCommand implements ICommand {
  constructor(public readonly cmd: AccountLoginRequest) {}
}

@CommandHandler(AccountLoginCommand)
@RpcHandler()
export class AccountLoginHandler
  implements ICommandHandler<AccountLoginCommand, AccountLoginResponse>
{
  private readonly logger = new Logger(AccountLoginHandler.name);

  constructor(
    private readonly accounts: AccountsModel,
    private readonly passwords: PasswordsModel,
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
  ) {}

  private get LoginError() {
    return new Error('Username or password mismatch!');
  }

  async execute(command: AccountLoginCommand): Promise<AccountLoginResponse> {
    const { username, password } = command.cmd;
    const account = await this.accounts
      .findByUsername(username)
      .orFail(() => this.LoginError);

    const userPassword = await this.passwords
      .findOne({ owner: account._id })
      .orFail(() => this.LoginError);

    const isValid = await this.passwords.validatePassword(
      password,
      userPassword.hashed,
    );

    if (!isValid) {
      throw this.LoginError;
    }

    const accountProto = new AccountTransformer(account).proto;
    const tokens = await this.commandBus.execute(
      new CreateAccessCommand(accountProto),
    );

    this.eventBus.publish(new AccountLoggedInEvent(accountProto, tokens));

    return {
      account: accountProto,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
