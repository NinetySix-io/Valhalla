import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  SendVerificationCodeRequest,
  SendVerificationCodeResponse,
} from '@serv.users/protobuf/user';

import { EmailVerificationSentEvent } from '../events/email.verification.sent.event';
import { JwtService } from '@nestjs/jwt';
import { RpcHandler } from '@valhalla/serv.core/src';
import { UsersModel } from '@serv.users/entities/users';
import { generateVerificationCode } from '@serv.users/lib/generate.verification.code';

export class SendAccountEmailVerificationCommand implements ICommand {
  constructor(public readonly input: SendVerificationCodeRequest) {}
}

@CommandHandler(SendAccountEmailVerificationCommand)
@RpcHandler()
export class SendAccountEmailVerificationHandler
  implements
    ICommandHandler<
      SendAccountEmailVerificationCommand,
      SendVerificationCodeResponse
    >
{
  constructor(
    private readonly users: UsersModel,
    private readonly jwtService: JwtService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: SendAccountEmailVerificationCommand,
  ): Promise<SendVerificationCodeResponse> {
    const user = await this.users.findByUsername(command.input.email);
    if (!user) {
      return {
        success: false,
      };
    }

    const email = user.emails.find((e) => e.value === command.input.email);
    if (email.isVerified) {
      throw new Error('Email is already verified');
    }
    const verificationCode = generateVerificationCode(6);
    const activationLink = this.jwtService.sign({
      userId: user.id,
      verificationCode,
    });

    email.verificationCode = verificationCode;
    user.save();
    this.eventBus.publish(new EmailVerificationSentEvent(user, activationLink));

    return {
      success: true,
    };
  }
}
