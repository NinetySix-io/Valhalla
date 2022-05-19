import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';

import { EmailVerifiedEvent } from '../events/email.verified.event';
import { RpcHandler } from '@valhalla/serv.core';
import { UserTransformer } from '@app/entities/users/transformer';
import { UsersModel } from '@app/entities/users';
import { VerifyUserResponse } from '@app/rpc/protobuf/users';

export class VerifyAccountEmailCommand implements ICommand {
  constructor(public readonly code: string, public readonly email: string) {}
}

@CommandHandler(VerifyAccountEmailCommand)
@RpcHandler()
export class VerifyAccountEmailHandler
  implements ICommandHandler<VerifyAccountEmailCommand, VerifyUserResponse>
{
  constructor(
    private readonly users: UsersModel,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: VerifyAccountEmailCommand,
  ): Promise<VerifyUserResponse> {
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
        ...new UserTransformer(user).proto,
        emailVerified: verifiedEmail.value,
      }),
    );

    return {
      success: true,
    };
  }
}
