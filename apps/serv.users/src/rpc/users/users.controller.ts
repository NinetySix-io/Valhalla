import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  FindUserRequest,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
  SendVerificationCodeRequest,
  SendVerificationCodeResponse,
  USERS_SERVICE_NAME,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  UpdateRequest,
  UpdateResponse,
  User,
  UsersServiceController,
  VerifyActivationLinkRequest,
  VerifyActivationLinkResponse,
  VerifyUserRequest,
  VerifyUserResponse,
} from '@app/rpc/protobuf/users';
import { GrpcClass, TransformMethodError } from '@valhalla/serv.core';

import { Controller } from '@nestjs/common';
import { FindUserQuery } from './queries/find.user.query';
import { ForgotAccountPasswordCommand } from '@app/rpc/users/commands/forgot.password.command';
import { JwtService } from '@nestjs/jwt';
import { LoginAccountCommand } from '@app/rpc/users/commands/login.command';
import { LogoutCommand } from './commands/logout.command';
import { Observable } from 'rxjs';
import { RegisterAccountCommand } from '@app/rpc/users/commands/register.command';
import { RpcException } from '@nestjs/microservices';
import { SendAccountEmailVerificationCommand } from '@app/rpc/users/commands/send.email.verification.command';
import { UpdateAccountCommand } from '@app/rpc/users/commands/update.command';
import { UpdateAccountPasswordCommand } from '@app/rpc/users/commands/update.password.command';
import { VerifyAccountEmailCommand } from '@app/rpc/users/commands/verify.email.command';

@Controller()
@GrpcClass(USERS_SERVICE_NAME)
export class RpcUsersController implements UsersServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly jwtService: JwtService,
  ) {}

  register(request: RegisterRequest): Promise<RegisterResponse> {
    return this.commandBus.execute(new RegisterAccountCommand(request));
  }

  login(request: LoginRequest): Promise<LoginResponse> {
    return this.commandBus.execute(new LoginAccountCommand(request));
  }

  logout(
    request: LogoutRequest,
  ): LogoutResponse | Promise<LogoutResponse> | Observable<LogoutResponse> {
    return this.commandBus.execute(new LogoutCommand(request));
  }

  findUser(request: FindUserRequest): Promise<User> {
    return this.queryBus.execute(new FindUserQuery(request));
  }

  updateUser(request: UpdateRequest): Promise<UpdateResponse> {
    return this.commandBus.execute(
      new UpdateAccountCommand(request.userId, request),
    );
  }

  verifyEmail(
    request: VerifyUserRequest,
  ):
    | VerifyUserResponse
    | Promise<VerifyUserResponse>
    | Observable<VerifyUserResponse> {
    return this.commandBus.execute(
      new VerifyAccountEmailCommand(request.verificationCode, request.email),
    );
  }

  @TransformMethodError(RpcException)
  async verifyActivationLink(
    request: VerifyActivationLinkRequest,
  ): Promise<VerifyActivationLinkResponse> {
    const decoded = (await this.jwtService.decode(request.token)) as {
      email: string;
      verificationCode: string;
    };

    return {
      email: decoded.email,
      verificationCode: decoded.verificationCode,
    };
  }

  sendVerificationCode(
    request: SendVerificationCodeRequest,
  ): Promise<SendVerificationCodeResponse> {
    return this.commandBus.execute(
      new SendAccountEmailVerificationCommand(request),
    );
  }

  forgotPassword(
    request: ForgotPasswordRequest,
  ):
    | ForgotPasswordResponse
    | Promise<ForgotPasswordResponse>
    | Observable<ForgotPasswordResponse> {
    return this.commandBus.execute(new ForgotAccountPasswordCommand(request));
  }

  updatePassword(
    request: UpdatePasswordRequest,
  ):
    | UpdatePasswordResponse
    | Promise<UpdatePasswordResponse>
    | Observable<UpdatePasswordResponse> {
    return this.commandBus.execute(new UpdateAccountPasswordCommand(request));
  }
}
