import {
  Account,
  CreateAccessResponse,
  LoginWithVerificationRequest,
  LoginWithVerificationResponse,
} from '@app/protobuf';
import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, Serializer } from '@valhalla/serv.core';

import { AccountLoggedInEvent } from '../events/account.logged.in.event';
import { AccountProto } from '../protos/account.proto';
import { AccountsModel } from '@app/entities/accounts';
import { CreateAccessCommand } from './create.access.command';
import { VerificationsModel } from '@app/entities/verifications';

export class LoginWithVerificationCommand implements ICommand {
  constructor(public readonly cmd: LoginWithVerificationRequest) {}
}

@CommandHandler(LoginWithVerificationCommand)
@RpcHandler()
export class LoginWithVerificationHandler
  implements
    ICommandHandler<
      LoginWithVerificationCommand,
      LoginWithVerificationResponse
    >
{
  constructor(
    private readonly accounts: AccountsModel,
    private readonly verifications: VerificationsModel,
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
  ) {}

  private makeToken(account: Account): Promise<CreateAccessResponse> {
    return this.commandBus.execute(new CreateAccessCommand(account));
  }

  async execute(
    command: LoginWithVerificationCommand,
  ): Promise<LoginWithVerificationResponse> {
    const { verificationCode, verificationId, username } = command.cmd;
    const verification = await this.verifications
      .findById(verificationId)
      .orFail();

    const isValid = await this.verifications.validateCode(
      verificationCode,
      verification.hashed,
    );

    if (!isValid) {
      throw new Error('Invalid verification code!');
    }

    const account = await this.accounts.findByUsername(username).orFail();
    const accountProto = Serializer.from(AccountProto).serialize(account);
    const tokens = await this.makeToken(accountProto);
    this.eventBus.publish(new AccountLoggedInEvent(accountProto));
    verification.delete();

    return {
      account: accountProto,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
