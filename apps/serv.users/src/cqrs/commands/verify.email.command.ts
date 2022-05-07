import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';

import { EmailVerifiedEvent } from '../events/email.verified.event';
import { RpcHandler } from '@valhalla/serv.core/src';
import { UsersModel } from '@serv.users/entities/users';
import { VerifyAccountResponse } from '@serv.users/protobuf/user';

export class VerifyAccountEmailCommand implements ICommand {
  constructor(public readonly code: string, public readonly email: string) {}
}

@CommandHandler(VerifyAccountEmailCommand)
@RpcHandler()
export class VerifyAccountEmailHandler
  implements ICommandHandler<VerifyAccountEmailCommand, VerifyAccountResponse>
{
  constructor(
    private readonly users: UsersModel,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: VerifyAccountEmailCommand,
  ): Promise<VerifyAccountResponse> {
    const user = await this.users.findByUsername(command.email);
    const verifiedEmail = user?.emails.find(
      (email) => email.verificationCode === command.code,
    );

    if (!user || !verifiedEmail) {
      throw Error('Invalid verification code');
    }

    verifiedEmail.isVerified = true;
    verifiedEmail.verificationCode = null;

    await user.save();
    this.eventBus.publish(
      new EmailVerifiedEvent({
        ...user,
        emailVerified: verifiedEmail.value,
      }),
    );

    return {
      success: true,
    };
  }
}
