import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  ReadRequest,
  ReadResponse,
  RegisterRequest,
  RegisterResponse,
  SendVerificationCodeRequest,
  SendVerificationCodeResponse,
  USERS_SERVICE_NAME,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  UpdateRequest,
  UpdateResponse,
  UsersServiceController,
  VerifyActivationLinkRequest,
  VerifyActivationLinkResponse,
  VerifyUserRequest,
  VerifyUserResponse,
} from '@serv.users/protobuf/user';
import { GrpcMethod, RpcException } from '@nestjs/microservices';

import { Controller } from '@nestjs/common';
import { ForgotAccountPasswordCommand } from '@serv.users/cqrs/commands/forgot.password.command';
import { JwtService } from '@nestjs/jwt';
import { LoginAccountCommand } from '@serv.users/cqrs/commands/login.command';
import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { RegisterAccountCommand } from '@serv.users/cqrs/commands/register.command';
import { SendAccountEmailVerificationCommand } from '@serv.users/cqrs/commands/send.email.verification.command';
import { TransformMethodError } from '@valhalla/serv.core';
import { UpdateAccountCommand } from '@serv.users/cqrs/commands/update.command';
import { UpdateAccountPasswordCommand } from '@serv.users/cqrs/commands/update.password.command';
import { VerifyAccountEmailCommand } from '@serv.users/cqrs/commands/verify.email.command';

@Controller('accounts')
export class AccountController implements UsersServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly jwtService: JwtService,
  ) {}

  @GrpcMethod(USERS_SERVICE_NAME)
  register(request: RegisterRequest): Promise<RegisterResponse> {
    return this.commandBus.execute(new RegisterAccountCommand(request));
  }

  @GrpcMethod(USERS_SERVICE_NAME)
  login(request: LoginRequest): Promise<LoginResponse> {
    return this.commandBus.execute(new LoginAccountCommand(request));
  }

  //TODO: fix this
  @GrpcMethod(USERS_SERVICE_NAME)
  logout():
    | LogoutResponse
    | Promise<LogoutResponse>
    | Observable<LogoutResponse> {
    return {
      success: true,
    };
  }

  //TODO: fix this
  @GrpcMethod(USERS_SERVICE_NAME)
  findUser(request: ReadRequest, metadata?: Metadata): Promise<ReadResponse> {
    throw new Error('Function not yet implements');
    return {} as any;
  }

  @GrpcMethod(USERS_SERVICE_NAME)
  updateUser(request: UpdateRequest): Promise<UpdateResponse> {
    return this.commandBus.execute(
      new UpdateAccountCommand(request.userId, request),
    );
  }

  @GrpcMethod(USERS_SERVICE_NAME)
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

  @GrpcMethod(USERS_SERVICE_NAME)
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

  @GrpcMethod(USERS_SERVICE_NAME)
  sendVerificationCode(
    request: SendVerificationCodeRequest,
  ): Promise<SendVerificationCodeResponse> {
    return this.commandBus.execute(
      new SendAccountEmailVerificationCommand(request),
    );
  }

  @GrpcMethod(USERS_SERVICE_NAME)
  forgotPassword(
    request: ForgotPasswordRequest,
  ):
    | ForgotPasswordResponse
    | Promise<ForgotPasswordResponse>
    | Observable<ForgotPasswordResponse> {
    return this.commandBus.execute(new ForgotAccountPasswordCommand(request));
  }

  @GrpcMethod(USERS_SERVICE_NAME)
  updatePassword(
    request: UpdatePasswordRequest,
  ):
    | UpdatePasswordResponse
    | Promise<UpdatePasswordResponse>
    | Observable<UpdatePasswordResponse> {
    return this.commandBus.execute(new UpdateAccountPasswordCommand(request));
  }
}
