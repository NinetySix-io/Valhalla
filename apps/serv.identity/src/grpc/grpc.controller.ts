import {
  Account,
  CreateAccessResponse,
  DecodeAccessTokenRequest,
  DeleteRefreshTokenRequest,
  DeleteRefreshTokenResponse,
  FindAccountRequest,
  IDENTITY_SERVICE_NAME,
  IdentityServiceController,
  LoginWithEmailRequest,
  LoginWithEmailResponse,
  LogoutRequest,
  LogoutResponse,
  ProvisionAccessTokenRequest,
  ProvisionAccessTokenResponse,
  RegisterRequest,
  RegisterResponse,
  SendEmailVerificationRequest,
  SendEmailVerificationResponse,
  UpdateAccountRequest,
  UpdateAccountResponse,
  VerifyAccountEmailRequest,
  VerifyAccountEmailResponse,
} from '@app/protobuf';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Controller, Logger } from '@nestjs/common';
import { GrpcClass, LogClassMethods } from '@valhalla/serv.core';

import { CreateAccessCommand } from '@app/cqrs/commands/create.access.command';
import { DecodeAccessTokenCommand } from '@app/cqrs/commands/decode.access.token.command';
import { DeleteRefreshTokenCommand } from '@app/cqrs/commands/delete.refresh.token.command';
import { FindAccountQuery } from '@app/cqrs/queries/find.account.query';
import { LoginWithEmailCommand } from '@app/cqrs/commands/login.with.email.command';
import { LogoutCommand } from '@app/cqrs/commands/logout.command';
import { Observable } from 'rxjs';
import { ProvisionAccessTokenCommand } from '@app/cqrs/commands/provision.access.token.command';
import { RegisterCommand } from '@app/cqrs/commands/register.command';
import { SendEmailVerificationCommand } from '@app/cqrs/commands/send.email.verification.command';
import { UpdateAccountCommand } from '@app/cqrs/commands/update.account.command';
import { VerifyAccountEmailCommand } from '@app/cqrs/commands/verify.account.email.command';
import { isDev } from '@valhalla/utilities';

@Controller()
@GrpcClass(IDENTITY_SERVICE_NAME)
@LogClassMethods({
  when: isDev(),
  onTrigger: (fnName) => Logger.debug(`gRPC: ${fnName}`),
})
export class gRpcController implements IdentityServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  sendEmailVerification(
    request: SendEmailVerificationRequest,
  ):
    | SendEmailVerificationResponse
    | Promise<SendEmailVerificationResponse>
    | Observable<SendEmailVerificationResponse> {
    return this.commandBus.execute(new SendEmailVerificationCommand(request));
  }
  register(
    request: RegisterRequest,
  ):
    | RegisterResponse
    | Promise<RegisterResponse>
    | Observable<RegisterResponse> {
    return this.commandBus.execute(new RegisterCommand(request));
  }
  loginWithEmail(
    request: LoginWithEmailRequest,
  ):
    | LoginWithEmailResponse
    | Promise<LoginWithEmailResponse>
    | Observable<LoginWithEmailResponse> {
    return this.commandBus.execute(new LoginWithEmailCommand(request));
  }
  logout(
    request: LogoutRequest,
  ): LogoutResponse | Promise<LogoutResponse> | Observable<LogoutResponse> {
    return this.commandBus.execute(new LogoutCommand(request));
  }
  createAccess(
    request: Account,
  ):
    | CreateAccessResponse
    | Promise<CreateAccessResponse>
    | Observable<CreateAccessResponse> {
    return this.commandBus.execute(new CreateAccessCommand(request));
  }
  deleteRefreshToken(
    request: DeleteRefreshTokenRequest,
  ):
    | DeleteRefreshTokenResponse
    | Promise<DeleteRefreshTokenResponse>
    | Observable<DeleteRefreshTokenResponse> {
    return this.commandBus.execute(new DeleteRefreshTokenCommand(request));
  }
  decodeAccessToken(
    request: DecodeAccessTokenRequest,
  ): Account | Promise<Account> | Observable<Account> {
    return this.commandBus.execute(new DecodeAccessTokenCommand(request));
  }

  findAccount(
    request: FindAccountRequest,
  ): Account | Promise<Account> | Observable<Account> {
    return this.queryBus.execute(new FindAccountQuery(request));
  }
  verifyAccountEmail(
    request: VerifyAccountEmailRequest,
  ):
    | VerifyAccountEmailResponse
    | Promise<VerifyAccountEmailResponse>
    | Observable<VerifyAccountEmailResponse> {
    return this.commandBus.execute(new VerifyAccountEmailCommand(request));
  }

  updateAccount(
    request: UpdateAccountRequest,
  ):
    | UpdateAccountResponse
    | Promise<UpdateAccountResponse>
    | Observable<UpdateAccountResponse> {
    return this.commandBus.execute(new UpdateAccountCommand(request));
  }
  provisionAccessToken(
    request: ProvisionAccessTokenRequest,
  ):
    | ProvisionAccessTokenResponse
    | Promise<ProvisionAccessTokenResponse>
    | Observable<ProvisionAccessTokenResponse> {
    return this.commandBus.execute(new ProvisionAccessTokenCommand(request));
  }
}
