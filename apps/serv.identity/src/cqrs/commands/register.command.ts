import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RegisterRequest, RegisterResponse } from '@app/protobuf';

import { AccountRegisteredEvent } from '../events/account.registered.event';
import { AccountTransformer } from '@app/entities/accounts/transformer';
import { AccountsModel } from '@app/entities/accounts';
import { RpcHandler } from '@valhalla/serv.core';
import { VerificationsModel } from '@app/entities/verifications';

export class RegisterCommand implements ICommand {
  constructor(public readonly cmd: RegisterRequest) {}
}

@CommandHandler(RegisterCommand)
@RpcHandler()
export class RegisterHandler
  implements ICommandHandler<RegisterCommand, RegisterResponse>
{
  constructor(
    private readonly accounts: AccountsModel,
    private readonly verification: VerificationsModel,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: RegisterCommand): Promise<RegisterResponse> {
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
    const accountProto = new AccountTransformer(account).proto;
    const event = new AccountRegisteredEvent(accountProto, 'local');

    account.save();
    this.eventBus.publish(event);

    return {
      account: accountProto,
    };
  }
}
