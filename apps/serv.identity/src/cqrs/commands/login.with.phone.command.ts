import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  CreateAccessResponse,
  LoginWithPhoneRequest,
  LoginWithPhoneResponse,
} from '@app/protobuf';

import { AccountLoggedInEvent } from '../events/account.logged.in.event';
import { AccountTransformer } from '@app/entities/accounts/transformer';
import { AccountsModel } from '@app/entities/accounts';
import { CreateAccessCommand } from './create.access.command';
import { RpcHandler } from '@valhalla/serv.core';
import { VerificationsModel } from '@app/entities/verifications';

export class LoginWithPhoneCommand implements ICommand {
  constructor(public readonly request: LoginWithPhoneRequest) {}
}

@CommandHandler(LoginWithPhoneCommand)
@RpcHandler()
export class LoginWithPhoneHandler
  implements ICommandHandler<LoginWithPhoneCommand, LoginWithPhoneResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
    private readonly accounts: AccountsModel,
    private readonly verifications: VerificationsModel,
  ) {}

  async execute(
    command: LoginWithPhoneCommand,
  ): Promise<LoginWithPhoneResponse> {
    const { verificationCode, verificationId, phone } = command.request;
    const verification = await this.verifications
      .findById(verificationId)
      .orFail(() => new Error('Verification not found!'));

    const isValid = await this.verifications.validateCode(
      verificationCode,
      verification.hashed,
    );

    if (!isValid) {
      throw new Error('Invalid verification code!');
    }

    const account = await this.accounts
      .findByValidPhone(phone)
      .orFail(() => new Error('Account not found!'));

    const accountProto = new AccountTransformer(account).proto;
    const tokens: CreateAccessResponse = await this.commandBus.execute(
      new CreateAccessCommand(accountProto),
    );

    this.eventBus.publish(new AccountLoggedInEvent(accountProto, tokens));

    return {
      account: accountProto,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      accessTokenExpiresAt: tokens.accessTokenExpiresAt,
    };
  }
}
