import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from '@serv.users/protobuf/user';

import { Environment } from '@serv.users/environment';
import { ForgotPasswordSentEvent } from '../events/forgot.password.sent.event';
import { JwtService } from '@nestjs/jwt';
import { RpcHandler } from '@valhalla/serv.core';
import { UserSchema } from '@serv.users/entities/users/schema';
import { UsersModel } from '@serv.users/entities/users';

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
    private readonly users: UsersModel,
    private readonly eventBus: EventBus,
    private readonly jwtService: JwtService,
  ) {}

  private getSignedJwtCode(user: UserSchema) {
    return this.jwtService.sign(
      { userId: user.id },
      { expiresIn: Environment.variables.PASSWORD_FORGOT_EXPIRES },
    );
  }

  async execute(
    command: ForgotAccountPasswordCommand,
  ): Promise<ForgotPasswordResponse> {
    const user = await this.users.findOne({ email: command.cmd.email });
    if (!user) {
      throw new Error('Email not found');
    }

    const jwtCode = this.getSignedJwtCode(user);
    this.eventBus.publish(new ForgotPasswordSentEvent(user, jwtCode));

    return {
      success: true,
    };
  }
}
