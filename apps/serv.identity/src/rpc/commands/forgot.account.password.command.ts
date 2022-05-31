import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from '@app/rpc/protobuf';

import { AccountSchema } from '@app/entities/accounts/schema';
import { AccountTransformer } from '@app/entities/accounts/transformer';
import { AccountsModel } from '@app/entities/accounts';
import { ForgotPasswordSentEvent } from '../events/forgot.password.sent.event';
import { RpcHandler } from '@valhalla/serv.core';

export class ForgotAccountPasswordCommand implements ICommand {
  constructor(public readonly cmd: Partial<ForgotPasswordRequest>) {}
}

@CommandHandler(ForgotAccountPasswordCommand)
@RpcHandler()
export class ForgotAccountPasswordHandler
  implements
    ICommandHandler<ForgotAccountPasswordCommand, ForgotPasswordResponse>
{
  constructor(
    private readonly accounts: AccountsModel,
    private readonly eventBus: EventBus,
  ) {}

  /**
   * TODO
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async generatePasswordRecoveryLink(_account: AccountSchema) {
    return 'TODO';
  }

  async execute(
    command: ForgotAccountPasswordCommand,
  ): Promise<ForgotPasswordResponse> {
    const account = await this.accounts
      .findOne({ email: command.cmd.email })
      .orFail(() => new Error('Account email not found!'));

    const link = await this.generatePasswordRecoveryLink(account);
    const userProto = new AccountTransformer(account).proto;
    this.eventBus.publish(new ForgotPasswordSentEvent(userProto, link));

    return {
      recoveryUrl: link,
    };
  }
}
