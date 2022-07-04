/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';

import { Observable } from 'rxjs';

export const protobufPackage = 'serv.identity';

export enum VerificationChannel {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
}

export interface AccessTokenAccountContent {
  id: string;
  displayName: string;
}

export interface AccessTokenOrContent {
  id: string;
  role: string;
}

export interface ValidateVerificationRequest {
  verificationId: string;
  verificationCode: string;
}

export interface ValidateVerificationResponse {
  isValid: boolean;
}

export interface DecodeAccessTokenResponse {
  account?: AccessTokenAccountContent;
  organization?: AccessTokenOrContent | undefined;
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

export interface SendVerificationCodeRequest {
  destination: string;
  channel: VerificationChannel;
}

export interface Verification {
  id: string;
  owner?: string | undefined;
  expiresAt?: Date;
}

export interface Token {
  value: string;
  expiresAt?: Date;
}

export interface AccessToken {}

export interface Email {
  value: string;
  isVerified: boolean;
  isPrimary: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Phone {
  value: string;
  isVerified: boolean;
  isPrimary: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Account {
  id: string;
  displayName: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
  createdAt?: Date;
  updatedAt?: Date;
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
  account?: Account;
  accessToken?: Token;
  refreshToken?: Token;
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
  updatedAccount?: Account;
}

export interface LoginWithVerificationResponse {
  account?: Account;
  refreshToken?: Token;
  accessToken?: Token;
}

export interface LoginWithVerificationRequest {
  verificationCode: string;
  verificationId: string;
  username: string;
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
  refreshToken?: Token;
  accessToken?: Token;
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
  organization?: string | undefined;
}

export interface ProvisionAccessTokenResponse {
  accessToken?: Token;
}

export const SERV_IDENTITY_PACKAGE_NAME = 'serv.identity';

export interface IdentityServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>;

  sendVerificationCode(
    request: SendVerificationCodeRequest,
  ): Observable<Verification>;

  loginWithVerification(
    request: LoginWithVerificationRequest,
  ): Observable<LoginWithVerificationResponse>;

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

  sendVerificationCode(
    request: SendVerificationCodeRequest,
  ): Promise<Verification> | Observable<Verification> | Verification;

  loginWithVerification(
    request: LoginWithVerificationRequest,
  ):
    | Promise<LoginWithVerificationResponse>
    | Observable<LoginWithVerificationResponse>
    | LoginWithVerificationResponse;

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
      'sendVerificationCode',
      'loginWithVerification',
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
      const descriptor = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      ) as PropertyDescriptor;
      GrpcMethod('IdentityService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      ) as PropertyDescriptor;
      GrpcStreamMethod('IdentityService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const IDENTITY_SERVICE_NAME = 'IdentityService';
