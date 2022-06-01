import {
  Account,
  AccountLoginRequest,
  AccountLoginResponse,
  AccountLogoutRequest,
  AccountLogoutResponse,
  AccountRegisterRequest,
  AccountRegisterResponse,
  CreateAccessResponse,
  DecodeAccessTokenRequest,
  DeleteRefreshTokenRequest,
  DeleteRefreshTokenResponse,
  FindAccountRequest,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  IDENTITY_SERVICE_NAME,
  IdentityServiceController,
  ProvisionAccessTokenRequest,
  ProvisionAccessTokenResponse,
  SendAccountVerificationCodeRequest,
  SendAccountVerificationCodeResponse,
  UpdateAccountRequest,
  UpdateAccountResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  VerifyAccountEmailRequest,
  VerifyAccountEmailResponse,
} from '@app/protobuf';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Controller, Logger } from '@nestjs/common';
import { GrpcClass, LogClassMethods } from '@valhalla/serv.core';

import { AccountLoginCommand } from '@app/cqrs/commands/account.login.command';
import { AccountLogoutCommand } from '@app/cqrs/commands/account.logout.command';
import { AccountRegisterCommand } from '@app/cqrs/commands/account.register.command';
import { CreateAccessCommand } from '@app/cqrs/commands/create.access.command';
import { DecodeAccessTokenCommand } from '@app/cqrs/commands/decode.access.token.command';
import { DeleteRefreshTokenCommand } from '@app/cqrs/commands/delete.refresh.token.command';
import { FindAccountQuery } from '@app/cqrs/queries/find.account.query';
import { ForgotAccountPasswordCommand } from '@app/cqrs/commands/forgot.account.password.command';
import { Observable } from 'rxjs';
import { ProvisionAccessTokenCommand } from '@app/cqrs/commands/provision.access.token.command';
import { SendAccountEmailVerificationCommand } from '@app/cqrs/commands/send.account.email.verification.command';
import { UpdateAccountCommand } from '@app/cqrs/commands/update.account.command';
import { UpdateAccountPasswordCommand } from '@app/cqrs/commands/update.account.password.command';
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
  accountRegister(
    request: AccountRegisterRequest,
  ):
    | AccountRegisterResponse
    | Promise<AccountRegisterResponse>
    | Observable<AccountRegisterResponse> {
    return this.commandBus.execute(new AccountRegisterCommand(request));
  }
  accountLogin(
    request: AccountLoginRequest,
  ):
    | AccountLoginResponse
    | Promise<AccountLoginResponse>
    | Observable<AccountLoginResponse> {
    return this.commandBus.execute(new AccountLoginCommand(request));
  }
  accountLogout(
    request: AccountLogoutRequest,
  ):
    | AccountLogoutResponse
    | Promise<AccountLogoutResponse>
    | Observable<AccountLogoutResponse> {
    return this.commandBus.execute(new AccountLogoutCommand(request));
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
    return this.commandBus.execute(
      new VerifyAccountEmailCommand(request.verificationCode, request.email),
    );
  }
  sendAccountEmailVerificationCode(
    request: SendAccountVerificationCodeRequest,
  ):
    | SendAccountVerificationCodeResponse
    | Promise<SendAccountVerificationCodeResponse>
    | Observable<SendAccountVerificationCodeResponse> {
    return this.commandBus.execute(
      new SendAccountEmailVerificationCommand(request),
    );
  }
  updateAccount(
    request: UpdateAccountRequest,
  ):
    | UpdateAccountResponse
    | Promise<UpdateAccountResponse>
    | Observable<UpdateAccountResponse> {
    return this.commandBus.execute(
      new UpdateAccountCommand(request.accountId, request),
    );
  }
  forgotAccountPassword(
    request: ForgotPasswordRequest,
  ):
    | ForgotPasswordResponse
    | Promise<ForgotPasswordResponse>
    | Observable<ForgotPasswordResponse> {
    return this.commandBus.execute(new ForgotAccountPasswordCommand(request));
  }
  updateAccountPassword(
    request: UpdatePasswordRequest,
  ):
    | UpdatePasswordResponse
    | Promise<UpdatePasswordResponse>
    | Observable<UpdatePasswordResponse> {
    return this.commandBus.execute(new UpdateAccountPasswordCommand(request));
  }
  provisionAccessToken(
    request: ProvisionAccessTokenRequest,
  ):
    | ProvisionAccessTokenResponse
    | Promise<ProvisionAccessTokenResponse>
    | Observable<ProvisionAccessTokenResponse> {
    return this.commandBus.execute(new ProvisionAccessTokenCommand(request));
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
