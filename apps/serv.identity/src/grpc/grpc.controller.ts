import {
  Account,
  AddEmailToAccountRequest,
  AddPhoneToAccountRequest,
  CreateAccessResponse,
  DecodeAccessTokenRequest,
  DecodeAccessTokenResponse,
  DeleteRefreshTokenRequest,
  DeleteRefreshTokenResponse,
  FindAccountRequest,
  IDENTITY_SERVICE_NAME,
  IdentityServiceController,
  LoginWithVerificationRequest,
  LoginWithVerificationResponse,
  LogoutRequest,
  LogoutResponse,
  ProvisionAccessTokenRequest,
  ProvisionAccessTokenResponse,
  RegisterRequest,
  RegisterResponse,
  RemoveEmailFromAccountRequest,
  RemovePhoneFromAccountRequest,
  SendVerificationCodeRequest,
  UpdateAccountRequest,
  UpdateAccountResponse,
  ValidateVerificationRequest,
  ValidateVerificationResponse,
  Verification,
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyPhoneRequest,
  VerifyPhoneResponse,
} from '@app/protobuf';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { AddEmailToAccountCommand } from '@app/cqrs/commands/add.email.to.account.command';
import { AddPhoneToAccountCommand } from '@app/cqrs/commands/add.phone.to.account.command';
import { Controller } from '@nestjs/common';
import { CreateAccessCommand } from '@app/cqrs/commands/create.access.command';
import { DecodeAccessTokenQuery } from '@app/cqrs/queries/decode.access.token.query';
import { DeleteRefreshTokenCommand } from '@app/cqrs/commands/delete.refresh.token.command';
import { FindAccountQuery } from '@app/cqrs/queries/find.account.query';
import { GrpcClass } from '@valhalla/serv.core';
import { LoginWithVerificationCommand } from '@app/cqrs/commands/login.with.verification.command';
import { LogoutCommand } from '@app/cqrs/commands/logout.command';
import { Observable } from 'rxjs';
import { ProvisionAccessTokenCommand } from '@app/cqrs/commands/provision.access.token.command';
import { RegisterCommand } from '@app/cqrs/commands/register.command';
import { RemoveEmailFromAccountCommand } from '@app/cqrs/commands/remove.email.from.account.command';
import { RemovePhoneFromAccountCommand } from '@app/cqrs/commands/remove.phone.from.account.command';
import { SendVerificationCodeCommand } from '@app/cqrs/commands/send.verification.code.command';
import { UpdateAccountCommand } from '@app/cqrs/commands/update.account.command';
import { ValidateVerificationQuery } from '@app/cqrs/queries/validate.verification.query';
import { VerifyEmailCommand } from '@app/cqrs/commands/verify.email.command';
import { VerifyPhoneCommand } from '@app/cqrs/commands/verify.phone.command';

@Controller()
@GrpcClass(IDENTITY_SERVICE_NAME)
export class gRpcController implements IdentityServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  sendVerificationCode(
    request: SendVerificationCodeRequest,
  ): Verification | Promise<Verification> | Observable<Verification> {
    return this.commandBus.execute(new SendVerificationCodeCommand(request));
  }
  loginWithVerification(
    request: LoginWithVerificationRequest,
  ):
    | LoginWithVerificationResponse
    | Promise<LoginWithVerificationResponse>
    | Observable<LoginWithVerificationResponse> {
    return this.commandBus.execute(new LoginWithVerificationCommand(request));
  }
  validateVerification(
    request: ValidateVerificationRequest,
  ):
    | ValidateVerificationResponse
    | Promise<ValidateVerificationResponse>
    | Observable<ValidateVerificationResponse> {
    return this.queryBus.execute(new ValidateVerificationQuery(request));
  }
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
  register(
    request: RegisterRequest,
  ):
    | RegisterResponse
    | Promise<RegisterResponse>
    | Observable<RegisterResponse> {
    return this.commandBus.execute(new RegisterCommand(request));
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
  ):
    | DecodeAccessTokenResponse
    | Promise<DecodeAccessTokenResponse>
    | Observable<DecodeAccessTokenResponse> {
    return this.queryBus.execute(new DecodeAccessTokenQuery(request));
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
