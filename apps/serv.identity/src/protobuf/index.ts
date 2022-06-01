/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "serv.identity";

export interface EmailObject {
  value: string;
  verificationCode?: string | undefined;
  isVerified: boolean;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PhoneObject {
  value: string;
  verificationCode?: string | undefined;
  isVerified: boolean;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  id: string;
  displayName?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  createdAt: string;
  updatedAt: string;
  emails: EmailObject[];
  phones: PhoneObject[];
}

export interface AccountRegisterRequest {
  displayName?: string | undefined;
  password: string;
  email: string;
  phone?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
}

export interface AccountRegisterResponse {
  account: Account | undefined;
}

export interface DeleteResponse {
  success: boolean;
}

export interface UpdateAccountRequest {
  accountId: string;
  displayName: string;
  firstName: string;
  lastName: string;
}

export interface UpdateAccountResponse {
  updatedAccount: Account | undefined;
}

export interface UpdatePasswordRequest {
  accountId: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdatePasswordResponse {
  success: boolean;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  recoveryUrl: string;
}

export interface AccountLoginResponse {
  account: Account | undefined;
  accessToken: string;
  refreshToken: string;
}

export interface AccountLoginRequest {
  password: string;
  username: string;
}

export interface AccountLogoutRequest {
  refreshToken?: string | undefined;
}

export interface AccountLogoutResponse {
  success: boolean;
}

export interface VerifyAccountEmailRequest {
  email: string;
  verificationCode: string;
}

export interface VerifyAccountEmailResponse {
  success: boolean;
}

export interface SendAccountVerificationCodeRequest {
  email: string;
}

export interface SendAccountVerificationCodeResponse {
  code: string;
}

export interface FindAccountRequest {
  accountId?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
}

export interface CreateAccessResponse {
  refreshToken: string;
  accessToken: string;
}

export interface DeleteRefreshTokenRequest {
  refreshToken: string;
}

export interface DeleteRefreshTokenResponse {
  success: boolean;
}

export interface DecodeAccessTokenRequest {
  accessToken: string;
}

export interface ProvisionAccessTokenRequest {
  refreshToken: string;
}

export interface ProvisionAccessTokenResponse {
  accessToken: string;
}

export const SERV_IDENTITY_PACKAGE_NAME = "serv.identity";

export interface IdentityServiceClient {
  accountRegister(
    request: AccountRegisterRequest
  ): Observable<AccountRegisterResponse>;

  accountLogin(request: AccountLoginRequest): Observable<AccountLoginResponse>;

  accountLogout(
    request: AccountLogoutRequest
  ): Observable<AccountLogoutResponse>;

  findAccount(request: FindAccountRequest): Observable<Account>;

  verifyAccountEmail(
    request: VerifyAccountEmailRequest
  ): Observable<VerifyAccountEmailResponse>;

  sendAccountEmailVerificationCode(
    request: SendAccountVerificationCodeRequest
  ): Observable<SendAccountVerificationCodeResponse>;

  updateAccount(
    request: UpdateAccountRequest
  ): Observable<UpdateAccountResponse>;

  forgotAccountPassword(
    request: ForgotPasswordRequest
  ): Observable<ForgotPasswordResponse>;

  updateAccountPassword(
    request: UpdatePasswordRequest
  ): Observable<UpdatePasswordResponse>;

  createAccess(request: Account): Observable<CreateAccessResponse>;

  deleteRefreshToken(
    request: DeleteRefreshTokenRequest
  ): Observable<DeleteRefreshTokenResponse>;

  provisionAccessToken(
    request: ProvisionAccessTokenRequest
  ): Observable<ProvisionAccessTokenResponse>;

  decodeAccessToken(request: DecodeAccessTokenRequest): Observable<Account>;
}

export interface IdentityServiceController {
  accountRegister(
    request: AccountRegisterRequest
  ):
    | Promise<AccountRegisterResponse>
    | Observable<AccountRegisterResponse>
    | AccountRegisterResponse;

  accountLogin(
    request: AccountLoginRequest
  ):
    | Promise<AccountLoginResponse>
    | Observable<AccountLoginResponse>
    | AccountLoginResponse;

  accountLogout(
    request: AccountLogoutRequest
  ):
    | Promise<AccountLogoutResponse>
    | Observable<AccountLogoutResponse>
    | AccountLogoutResponse;

  findAccount(
    request: FindAccountRequest
  ): Promise<Account> | Observable<Account> | Account;

  verifyAccountEmail(
    request: VerifyAccountEmailRequest
  ):
    | Promise<VerifyAccountEmailResponse>
    | Observable<VerifyAccountEmailResponse>
    | VerifyAccountEmailResponse;

  sendAccountEmailVerificationCode(
    request: SendAccountVerificationCodeRequest
  ):
    | Promise<SendAccountVerificationCodeResponse>
    | Observable<SendAccountVerificationCodeResponse>
    | SendAccountVerificationCodeResponse;

  updateAccount(
    request: UpdateAccountRequest
  ):
    | Promise<UpdateAccountResponse>
    | Observable<UpdateAccountResponse>
    | UpdateAccountResponse;

  forgotAccountPassword(
    request: ForgotPasswordRequest
  ):
    | Promise<ForgotPasswordResponse>
    | Observable<ForgotPasswordResponse>
    | ForgotPasswordResponse;

  updateAccountPassword(
    request: UpdatePasswordRequest
  ):
    | Promise<UpdatePasswordResponse>
    | Observable<UpdatePasswordResponse>
    | UpdatePasswordResponse;

  createAccess(
    request: Account
  ):
    | Promise<CreateAccessResponse>
    | Observable<CreateAccessResponse>
    | CreateAccessResponse;

  deleteRefreshToken(
    request: DeleteRefreshTokenRequest
  ):
    | Promise<DeleteRefreshTokenResponse>
    | Observable<DeleteRefreshTokenResponse>
    | DeleteRefreshTokenResponse;

  provisionAccessToken(
    request: ProvisionAccessTokenRequest
  ):
    | Promise<ProvisionAccessTokenResponse>
    | Observable<ProvisionAccessTokenResponse>
    | ProvisionAccessTokenResponse;

  decodeAccessToken(
    request: DecodeAccessTokenRequest
  ): Promise<Account> | Observable<Account> | Account;
}

export function IdentityServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "accountRegister",
      "accountLogin",
      "accountLogout",
      "findAccount",
      "verifyAccountEmail",
      "sendAccountEmailVerificationCode",
      "updateAccount",
      "forgotAccountPassword",
      "updateAccountPassword",
      "createAccess",
      "deleteRefreshToken",
      "provisionAccessToken",
      "decodeAccessToken",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("IdentityService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("IdentityService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const IDENTITY_SERVICE_NAME = "IdentityService";
