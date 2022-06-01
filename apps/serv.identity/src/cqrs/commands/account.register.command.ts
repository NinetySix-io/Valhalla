import { AccountRegisterRequest, AccountRegisterResponse } from '@app/protobuf';
import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';

import { AccountRegisteredEvent } from '../events/account.registered.event';
import { AccountTransformer } from '@app/entities/accounts/transformer';
import { AccountsModel } from '@app/entities/accounts';
import { PasswordsModel } from '@app/entities/passwords';
import { RpcHandler } from '@valhalla/serv.core';

export class AccountRegisterCommand implements ICommand {
  constructor(public readonly cmd: AccountRegisterRequest) {}
}

@CommandHandler(AccountRegisterCommand)
@RpcHandler()
export class AccountRegisterHandler
  implements ICommandHandler<AccountRegisterCommand, AccountRegisterResponse>
{
  constructor(
    private readonly accounts: AccountsModel,
    private readonly passwords: PasswordsModel,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: AccountRegisterCommand,
  ): Promise<AccountRegisterResponse> {
    const [emailExists, phoneExists] = await Promise.all([
      this.accounts.emailExists(command.cmd.email),
      command.cmd.phone && this.accounts.phoneExists(command.cmd.phone),
    ]);

    // TODO: logic for phone verification if
    // email/phone exists but is not primary
    if (emailExists) {
      throw new Error('Email address exists!');
    } else if (phoneExists) {
      throw new Error('Phone number exists!');
    }

    const account = await this.accounts.createAccount(command.cmd);
    await this.passwords.createPassword(account._id, command.cmd.password);
    const accountProto = new AccountTransformer(account).proto;
    const event = new AccountRegisteredEvent(accountProto, 'local');

    account.save();
    this.eventBus.publish(event);

    return {
      account: accountProto,
    };
  }
}
