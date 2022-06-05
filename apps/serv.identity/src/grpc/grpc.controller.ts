import {
  Account,
  AddEmailToAccountRequest,
  AddPhoneToAccountRequest,
  CreateAccessResponse,
  DecodeAccessTokenRequest,
  DeleteRefreshTokenRequest,
  DeleteRefreshTokenResponse,
  FindAccountRequest,
  IDENTITY_SERVICE_NAME,
  IdentityServiceController,
  LoginWithEmailRequest,
  LoginWithEmailResponse,
  LoginWithPhoneRequest,
  LoginWithPhoneResponse,
  LogoutRequest,
  LogoutResponse,
  ProvisionAccessTokenRequest,
  ProvisionAccessTokenResponse,
  RegisterRequest,
  RegisterResponse,
  RemoveEmailFromAccountRequest,
  RemovePhoneFromAccountRequest,
  SendEmailVerificationRequest,
  SendPhoneVerificationRequest,
  UpdateAccountRequest,
  UpdateAccountResponse,
  Verification,
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyPhoneRequest,
  VerifyPhoneResponse,
} from '@app/protobuf';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Controller, Logger } from '@nestjs/common';
import { GrpcClass, LogClassMethods } from '@valhalla/serv.core';

import { AddEmailToAccountCommand } from '@app/cqrs/commands/add.email.to.account.command';
import { AddPhoneToAccountCommand } from '@app/cqrs/commands/add.phone.to.account.command';
import { CreateAccessCommand } from '@app/cqrs/commands/create.access.command';
import { DecodeAccessTokenCommand } from '@app/cqrs/commands/decode.access.token.command';
import { DeleteRefreshTokenCommand } from '@app/cqrs/commands/delete.refresh.token.command';
import { FindAccountQuery } from '@app/cqrs/queries/find.account.query';
import { LoginWithEmailCommand } from '@app/cqrs/commands/login.with.email.command';
import { LoginWithPhoneCommand } from '@app/cqrs/commands/login.with.phone.command';
import { LogoutCommand } from '@app/cqrs/commands/logout.command';
import { Observable } from 'rxjs';
import { ProvisionAccessTokenCommand } from '@app/cqrs/commands/provision.access.token.command';
import { RegisterCommand } from '@app/cqrs/commands/register.command';
import { RemoveEmailFromAccountCommand } from '@app/cqrs/commands/remove.email.from.account.command';
import { RemovePhoneFromAccountCommand } from '@app/cqrs/commands/remove.phone.from.account.command';
import { SendEmailVerificationCommand } from '@app/cqrs/commands/send.email.verification.command';
import { SendPhoneVerificationCommand } from '@app/cqrs/commands/send.phone.verification.command';
import { UpdateAccountCommand } from '@app/cqrs/commands/update.account.command';
import { VerifyEmailCommand } from '@app/cqrs/commands/verify.email.command';
import { VerifyPhoneCommand } from '@app/cqrs/commands/verify.phone.command';
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
  addEmailToAccount(
    request: AddEmailToAccountRequest,
  ): Account | Promise<Account> | Observable<Account> {
    return this.commandBus.execute(new AddEmailToAccountCommand(request));
  }
  addPhoneToAccount(
    request: AddPhoneToAccountRequest,
  ): Account | Promise<Account> | Observable<Account> {
    return this.commandBus.execute(new AddPhoneToAccountCommand(request));
  }
  removeEmailFromAccount(
    request: RemoveEmailFromAccountRequest,
  ): Account | Promise<Account> | Observable<Account> {
    return this.commandBus.execute(new RemoveEmailFromAccountCommand(request));
  }
  removePhoneFromAccount(
    request: RemovePhoneFromAccountRequest,
  ): Account | Promise<Account> | Observable<Account> {
    return this.commandBus.execute(new RemovePhoneFromAccountCommand(request));
  }
  loginWithPhone(
    request: LoginWithPhoneRequest,
  ):
    | LoginWithPhoneResponse
    | Promise<LoginWithPhoneResponse>
    | Observable<LoginWithPhoneResponse> {
    return this.commandBus.execute(new LoginWithPhoneCommand(request));
  }
  verifyEmail(
    request: VerifyEmailRequest,
  ):
    | VerifyEmailResponse
    | Promise<VerifyEmailResponse>
    | Observable<VerifyEmailResponse> {
    return this.commandBus.execute(new VerifyEmailCommand(request));
  }
  verifyPhone(
    request: VerifyPhoneRequest,
  ):
    | VerifyPhoneResponse
    | Promise<VerifyPhoneResponse>
    | Observable<VerifyPhoneResponse> {
    return this.commandBus.execute(new VerifyPhoneCommand(request));
  }
  sendPhoneVerification(
    request: SendPhoneVerificationRequest,
  ): Verification | Promise<Verification> | Observable<Verification> {
    return this.commandBus.execute(new SendPhoneVerificationCommand(request));
  }
  sendEmailVerification(
    request: SendEmailVerificationRequest,
  ): Verification | Promise<Verification> | Observable<Verification> {
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
