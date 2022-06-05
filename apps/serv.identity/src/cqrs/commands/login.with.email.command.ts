import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  CreateAccessResponse,
  LoginWithEmailRequest,
  LoginWithEmailResponse,
} from '@app/protobuf';

import { AccountLoggedInEvent } from '../events/account.logged.in.event';
import { AccountTransformer } from '@app/entities/accounts/transformer';
import { AccountsModel } from '@app/entities/accounts';
import { CreateAccessCommand } from './create.access.command';
import { RpcHandler } from '@valhalla/serv.core';
import { VerificationsModel } from '@app/entities/verifications';

export class LoginWithEmailCommand implements ICommand {
  constructor(public readonly cmd: LoginWithEmailRequest) {}
}

@CommandHandler(LoginWithEmailCommand)
@RpcHandler()
export class LoginWithEmailHandler
  implements ICommandHandler<LoginWithEmailCommand, LoginWithEmailResponse>
{
  constructor(
    private readonly accounts: AccountsModel,
    private readonly verifications: VerificationsModel,
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(
    command: LoginWithEmailCommand,
  ): Promise<LoginWithEmailResponse> {
    const { verificationCode, verificationId, email } = command.cmd;
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
      .findByValidEmail(email)
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
