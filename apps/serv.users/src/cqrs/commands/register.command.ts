import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RegisterRequest, RegisterResponse } from '@serv.users/protobuf/user';

import { JwtService } from '@nestjs/jwt';
import { RpcHandler } from '@valhalla/serv.core';
import { UserRegisteredEvent } from '../events/user.registered.event';
import { UserSchema } from '@serv.users/entities/users/schema';
import { UsersModel } from '@serv.users/entities/users';
import { generateVerificationCode } from '@serv.users/lib/generate.verification.code';

export class RegisterAccountCommand implements ICommand {
  constructor(public readonly cmd: RegisterRequest) {}
}

@CommandHandler(RegisterAccountCommand)
@RpcHandler()
export class RegisterAccountHandler
  implements ICommandHandler<RegisterAccountCommand, RegisterResponse>
{
  constructor(
    private readonly users: UsersModel,
    private readonly eventBus: EventBus,
    private readonly jwtService: JwtService,
  ) {}

  //TODO: put expires in {@see Environment}
  private getSignedJwtCode(user: UserSchema, verificationCode: string) {
    return this.jwtService.sign(
      { userId: user.id, verificationCode },
      { expiresIn: '1h' },
    );
  }

  async execute(command: RegisterAccountCommand): Promise<RegisterResponse> {
    const [emailExists, phoneExists] = await Promise.all([
      this.users.emailExists(command.cmd.email),
      this.users.phoneExists(command.cmd.phone),
    ]);

    // TODO: logic for phone verification if
    // email/phone exists but is not primary
    if (emailExists) {
      throw new Error('Email address exists!');
    } else if (phoneExists) {
      throw new Error('Phone number exists!');
    }

    const user = await this.users.createUser(command.cmd);
    const verificationCode = generateVerificationCode(6);
    const activationLink = this.getSignedJwtCode(user, verificationCode);
    user.emails[0].verificationCode = verificationCode;

    user.save();
    this.eventBus.publish(
      new UserRegisteredEvent(user, activationLink, 'local'),
    );

    return {
      activationLink,
    };
  }
}
