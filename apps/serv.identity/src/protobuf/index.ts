/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "serv.identity";

export interface SendEmailVerificationRequest {
  accountId: string;
}

export interface SendEmailVerificationResponse {
  verification: Verification | undefined;
}

export interface Verification {
  id: string;
  owner: string;
  expiresAt: string;
}

export interface RefreshToken {
  id: string;
  expiresAt: string;
  account: string;
}

export interface Email {
  value: string;
  isVerified: boolean;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Phone {
  value: string;
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
  emails: Email[];
  phones: Phone[];
}

export interface RegisterRequest {
  displayName?: string | undefined;
  email: string;
  phone?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
}

export interface RegisterResponse {
  account: Account | undefined;
}

export interface DeleteResponse {
  success: boolean;
}

export interface UpdateAccountRequest {
  accountId: string;
  displayName?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
}

export interface UpdateAccountResponse {
  updatedAccount: Account | undefined;
}

export interface LoginWithEmailResponse {
  account: Account | undefined;
  accessToken: string;
  refreshToken: string;
}

export interface LoginWithEmailRequest {
  verificationCode: string;
  username: string;
  verificationId: string;
}

export interface LogoutRequest {
  refreshToken?: string | undefined;
}

export interface LogoutResponse {
  success: boolean;
}

export interface VerifyAccountEmailRequest {
  email: string;
  verificationCode: string;
  accountId: string;
}

export interface VerifyAccountEmailResponse {
  verificationId: string;
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
  register(request: RegisterRequest): Observable<RegisterResponse>;

  sendEmailVerification(
    request: SendEmailVerificationRequest
  ): Observable<SendEmailVerificationResponse>;

  loginWithEmail(
    request: LoginWithEmailRequest
  ): Observable<LoginWithEmailResponse>;

  logout(request: LogoutRequest): Observable<LogoutResponse>;

  findAccount(request: FindAccountRequest): Observable<Account>;

  verifyAccountEmail(
    request: VerifyAccountEmailRequest
  ): Observable<VerifyAccountEmailResponse>;

  updateAccount(
    request: UpdateAccountRequest
  ): Observable<UpdateAccountResponse>;

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
  register(
    request: RegisterRequest
  ):
    | Promise<RegisterResponse>
    | Observable<RegisterResponse>
    | RegisterResponse;

  sendEmailVerification(
    request: SendEmailVerificationRequest
  ):
    | Promise<SendEmailVerificationResponse>
    | Observable<SendEmailVerificationResponse>
    | SendEmailVerificationResponse;

  loginWithEmail(
    request: LoginWithEmailRequest
  ):
    | Promise<LoginWithEmailResponse>
    | Observable<LoginWithEmailResponse>
    | LoginWithEmailResponse;

  logout(
    request: LogoutRequest
  ): Promise<LogoutResponse> | Observable<LogoutResponse> | LogoutResponse;

  findAccount(
    request: FindAccountRequest
  ): Promise<Account> | Observable<Account> | Account;

  verifyAccountEmail(
    request: VerifyAccountEmailRequest
  ):
    | Promise<VerifyAccountEmailResponse>
    | Observable<VerifyAccountEmailResponse>
    | VerifyAccountEmailResponse;

  updateAccount(
    request: UpdateAccountRequest
  ):
    | Promise<UpdateAccountResponse>
    | Observable<UpdateAccountResponse>
    | UpdateAccountResponse;

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
      "register",
      "sendEmailVerification",
      "loginWithEmail",
      "logout",
      "findAccount",
      "verifyAccountEmail",
      "updateAccount",
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
