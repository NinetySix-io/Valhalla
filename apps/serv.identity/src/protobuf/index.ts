/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export const protobufPackage = 'serv.identity';

export interface AccessTokenAccountContent {
  id: string;
  displayName: string;
}

export interface ValidateVerificationRequest {
  verificationId: string;
  verificationCode: string;
}

export interface ValidateVerificationResponse {
  isValid: boolean;
}

export interface DecodeAccessTokenResponse {
  account: AccessTokenAccountContent | undefined;
}

export interface AddEmailToAccountRequest {
  accountId: string;
  email: string;
}

export interface AddPhoneToAccountRequest {
  accountId: string;
  phone: string;
}

export interface RemoveEmailFromAccountRequest {
  accountId: string;
  email: string;
}

export interface RemovePhoneFromAccountRequest {
  accountId: string;
  phone: string;
}

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
  accessTokenExpiresAt: string;
}

export interface SendEmailVerificationRequest {
  email: string;
}

export interface SendPhoneVerificationRequest {
  phone: string;
}

export interface Verification {
  id: string;
  owner?: string | undefined;
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
  displayName: string;
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
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
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
  accessTokenExpiresAt: string;
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
  accessTokenExpiresAt: string;
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
  accessTokenExpiresAt: string;
}

export const SERV_IDENTITY_PACKAGE_NAME = 'serv.identity';

export interface IdentityServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>;

  sendEmailVerification(
    request: SendEmailVerificationRequest,
  ): Observable<Verification>;

  sendPhoneVerification(
    request: SendPhoneVerificationRequest,
  ): Observable<Verification>;

  loginWithEmail(
    request: LoginWithEmailRequest,
  ): Observable<LoginWithEmailResponse>;

  loginWithPhone(
    request: LoginWithPhoneRequest,
  ): Observable<LoginWithPhoneResponse>;

  logout(request: LogoutRequest): Observable<LogoutResponse>;

  verifyEmail(request: VerifyEmailRequest): Observable<VerifyEmailResponse>;

  verifyPhone(request: VerifyPhoneRequest): Observable<VerifyPhoneResponse>;

  findAccount(request: FindAccountRequest): Observable<Account>;

  updateAccount(
    request: UpdateAccountRequest,
  ): Observable<UpdateAccountResponse>;

  addEmailToAccount(request: AddEmailToAccountRequest): Observable<Account>;

  addPhoneToAccount(request: AddPhoneToAccountRequest): Observable<Account>;

  removeEmailFromAccount(
    request: RemoveEmailFromAccountRequest,
  ): Observable<Account>;

  removePhoneFromAccount(
    request: RemovePhoneFromAccountRequest,
  ): Observable<Account>;

  createAccess(request: Account): Observable<CreateAccessResponse>;

  deleteRefreshToken(
    request: DeleteRefreshTokenRequest,
  ): Observable<DeleteRefreshTokenResponse>;

  provisionAccessToken(
    request: ProvisionAccessTokenRequest,
  ): Observable<ProvisionAccessTokenResponse>;

  decodeAccessToken(
    request: DecodeAccessTokenRequest,
  ): Observable<DecodeAccessTokenResponse>;

  validateVerification(
    request: ValidateVerificationRequest,
  ): Observable<ValidateVerificationResponse>;
}

export interface IdentityServiceController {
  register(
    request: RegisterRequest,
  ):
    | Promise<RegisterResponse>
    | Observable<RegisterResponse>
    | RegisterResponse;

  sendEmailVerification(
    request: SendEmailVerificationRequest,
  ): Promise<Verification> | Observable<Verification> | Verification;

  sendPhoneVerification(
    request: SendPhoneVerificationRequest,
  ): Promise<Verification> | Observable<Verification> | Verification;

  loginWithEmail(
    request: LoginWithEmailRequest,
  ):
    | Promise<LoginWithEmailResponse>
    | Observable<LoginWithEmailResponse>
    | LoginWithEmailResponse;

  loginWithPhone(
    request: LoginWithPhoneRequest,
  ):
    | Promise<LoginWithPhoneResponse>
    | Observable<LoginWithPhoneResponse>
    | LoginWithPhoneResponse;

  logout(
    request: LogoutRequest,
  ): Promise<LogoutResponse> | Observable<LogoutResponse> | LogoutResponse;

  verifyEmail(
    request: VerifyEmailRequest,
  ):
    | Promise<VerifyEmailResponse>
    | Observable<VerifyEmailResponse>
    | VerifyEmailResponse;

  verifyPhone(
    request: VerifyPhoneRequest,
  ):
    | Promise<VerifyPhoneResponse>
    | Observable<VerifyPhoneResponse>
    | VerifyPhoneResponse;

  findAccount(
    request: FindAccountRequest,
  ): Promise<Account> | Observable<Account> | Account;

  updateAccount(
    request: UpdateAccountRequest,
  ):
    | Promise<UpdateAccountResponse>
    | Observable<UpdateAccountResponse>
    | UpdateAccountResponse;

  addEmailToAccount(
    request: AddEmailToAccountRequest,
  ): Promise<Account> | Observable<Account> | Account;

  addPhoneToAccount(
    request: AddPhoneToAccountRequest,
  ): Promise<Account> | Observable<Account> | Account;

  removeEmailFromAccount(
    request: RemoveEmailFromAccountRequest,
  ): Promise<Account> | Observable<Account> | Account;

  removePhoneFromAccount(
    request: RemovePhoneFromAccountRequest,
  ): Promise<Account> | Observable<Account> | Account;

  createAccess(
    request: Account,
  ):
    | Promise<CreateAccessResponse>
    | Observable<CreateAccessResponse>
    | CreateAccessResponse;

  deleteRefreshToken(
    request: DeleteRefreshTokenRequest,
  ):
    | Promise<DeleteRefreshTokenResponse>
    | Observable<DeleteRefreshTokenResponse>
    | DeleteRefreshTokenResponse;

  provisionAccessToken(
    request: ProvisionAccessTokenRequest,
  ):
    | Promise<ProvisionAccessTokenResponse>
    | Observable<ProvisionAccessTokenResponse>
    | ProvisionAccessTokenResponse;

  decodeAccessToken(
    request: DecodeAccessTokenRequest,
  ):
    | Promise<DecodeAccessTokenResponse>
    | Observable<DecodeAccessTokenResponse>
    | DecodeAccessTokenResponse;

  validateVerification(
    request: ValidateVerificationRequest,
  ):
    | Promise<ValidateVerificationResponse>
    | Observable<ValidateVerificationResponse>
    | ValidateVerificationResponse;
}

export function IdentityServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'register',
      'sendEmailVerification',
      'sendPhoneVerification',
      'loginWithEmail',
      'loginWithPhone',
      'logout',
      'verifyEmail',
      'verifyPhone',
      'findAccount',
      'updateAccount',
      'addEmailToAccount',
      'addPhoneToAccount',
      'removeEmailFromAccount',
      'removePhoneFromAccount',
      'createAccess',
      'deleteRefreshToken',
      'provisionAccessToken',
      'decodeAccessToken',
      'validateVerification',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('IdentityService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('IdentityService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const IDENTITY_SERVICE_NAME = 'IdentityService';

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
