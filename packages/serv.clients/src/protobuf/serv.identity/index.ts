/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "serv.identity";

export interface VerifyPhoneRequest {
  phone: string;
  verificationCode: string;
  accountId: string;
}

export interface VerifyPhoneResponse {
  verificationId: string;
}

export interface LoginWithPhoneRequest {
  phone: string;
  verificationCode: string;
  verificationId: string;
}

export interface LoginWithPhoneResponse {
  account: Account | undefined;
  accessToken: string;
  refreshToken: string;
}

export interface SendEmailVerificationRequest {
  email: string;
}

export interface SendPhoneVerificationRequest {
  phone: string;
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
  email: string;
  verificationCode: string;
  verificationId: string;
}

export interface LogoutRequest {
  refreshToken?: string | undefined;
}

export interface LogoutResponse {
  success: boolean;
}

export interface VerifyEmailRequest {
  email: string;
  verificationCode: string;
  accountId: string;
}

export interface VerifyEmailResponse {
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
  ): Observable<Verification>;

  sendPhoneVerification(
    request: SendPhoneVerificationRequest
  ): Observable<Verification>;

  loginWithEmail(
    request: LoginWithEmailRequest
  ): Observable<LoginWithEmailResponse>;

  loginWithPhone(
    request: LoginWithPhoneRequest
  ): Observable<LoginWithPhoneResponse>;

  logout(request: LogoutRequest): Observable<LogoutResponse>;

  verifyEmail(request: VerifyEmailRequest): Observable<VerifyEmailResponse>;

  verifyPhone(request: VerifyPhoneRequest): Observable<VerifyPhoneResponse>;

  findAccount(request: FindAccountRequest): Observable<Account>;

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
  ): Promise<Verification> | Observable<Verification> | Verification;

  sendPhoneVerification(
    request: SendPhoneVerificationRequest
  ): Promise<Verification> | Observable<Verification> | Verification;

  loginWithEmail(
    request: LoginWithEmailRequest
  ):
    | Promise<LoginWithEmailResponse>
    | Observable<LoginWithEmailResponse>
    | LoginWithEmailResponse;

  loginWithPhone(
    request: LoginWithPhoneRequest
  ):
    | Promise<LoginWithPhoneResponse>
    | Observable<LoginWithPhoneResponse>
    | LoginWithPhoneResponse;

  logout(
    request: LogoutRequest
  ): Promise<LogoutResponse> | Observable<LogoutResponse> | LogoutResponse;

  verifyEmail(
    request: VerifyEmailRequest
  ):
    | Promise<VerifyEmailResponse>
    | Observable<VerifyEmailResponse>
    | VerifyEmailResponse;

  verifyPhone(
    request: VerifyPhoneRequest
  ):
    | Promise<VerifyPhoneResponse>
    | Observable<VerifyPhoneResponse>
    | VerifyPhoneResponse;

  findAccount(
    request: FindAccountRequest
  ): Promise<Account> | Observable<Account> | Account;

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
      "sendPhoneVerification",
      "loginWithEmail",
      "loginWithPhone",
      "logout",
      "verifyEmail",
      "verifyPhone",
      "findAccount",
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
