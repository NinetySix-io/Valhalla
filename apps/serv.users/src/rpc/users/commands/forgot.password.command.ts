import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from '@app/protobuf/users';

import { BootConfigService } from '@app/services/boot.config.service';
import { ForgotPasswordSentEvent } from '../events/forgot.password.sent.event';
import { JwtService } from '@nestjs/jwt';
import { RpcHandler } from '@valhalla/serv.core';
import { UserSchema } from '@app/entities/users/schema';
import { UserTransformer } from '@app/entities/users/transformer';
import { UsersModel } from '@app/entities/users';

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
    private readonly bootConfig: BootConfigService,
  ) {}

  private getSignedJwtCode(user: UserSchema) {
    return this.jwtService.sign(
      { userId: user.id },
      { expiresIn: this.bootConfig.passwordExpires },
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
    const userProto = new UserTransformer(user).proto;

    this.eventBus.publish(new ForgotPasswordSentEvent(userProto, jwtCode));

    return {
      success: true,
    };
  }
}
