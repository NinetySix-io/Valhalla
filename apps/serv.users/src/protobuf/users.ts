/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'io.valhalla.serv.users';

export interface PasswordStruct {
  hashed: string;
}

export interface EmailObject {
  id: string;
  value: string;
  verificationCode: string;
  isVerified: boolean;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PhoneObject {
  id: string;
  value: string;
  verificationCode: string;
  isVerified: boolean;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  displayName: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  emails: EmailObject[];
  phones: PhoneObject[];
}

export interface Session {
  id: string;
  userId: string;
  created: number;
  expires: number;
}

export interface RegisterRequest {
  displayName: string;
  password: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
}

export interface RegisterResponse {
  activationLink: string;
}

export interface DeleteRequest {
  id: string;
}

export interface DeleteResponse {
  success: boolean;
}

export interface ReadRequest {
  query: string;
}

export interface ReadResponse {
  user: User | undefined;
}

export interface UpdateRequest {
  userId: string;
  displayName: string;
  firstName: string;
  lastName: string;
}

export interface UpdateResponse {
  user: User | undefined;
}

export interface UpdatePasswordRequest {
  userId: string;
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
  success: boolean;
}

export interface SearchRequest {
  phone: string;
  email: string;
  limit: number;
  offset: number;
}

export interface SearchResponse {
  users: User[];
}

export interface LoginTypeParams {
  password: string;
  username: string;
}

export interface LoginRequest {
  params: LoginTypeParams | undefined;
}

export interface LoginResponse {
  session: Session | undefined;
  user: User | undefined;
}

export interface LogoutRequest {
  sessionId: string;
}

export interface LogoutResponse {
  success: boolean;
}

export interface VerifyUserRequest {
  email: string;
  verificationCode: string;
}

export interface VerifyUserResponse {
  success: boolean;
}

export interface VerifyActivationLinkRequest {
  token: string;
}

export interface VerifyActivationLinkResponse {
  email: string;
  verificationCode: string;
}

export interface SendVerificationCodeRequest {
  email: string;
}

export interface SendVerificationCodeResponse {
  success: boolean;
}

export const IO_VALHALLA_SERV_USERS_PACKAGE_NAME = 'io.valhalla.serv.users';

export interface UsersServiceClient {
  register(
    request: RegisterRequest,
    metadata?: Metadata,
  ): Observable<RegisterResponse>;

  findUser(request: ReadRequest, metadata?: Metadata): Observable<ReadResponse>;

  verifyEmail(
    request: VerifyUserRequest,
    metadata?: Metadata,
  ): Observable<VerifyUserResponse>;

  verifyActivationLink(
    request: VerifyActivationLinkRequest,
    metadata?: Metadata,
  ): Observable<VerifyActivationLinkResponse>;

  sendVerificationCode(
    request: SendVerificationCodeRequest,
    metadata?: Metadata,
  ): Observable<SendVerificationCodeResponse>;

  updateUser(
    request: UpdateRequest,
    metadata?: Metadata,
  ): Observable<UpdateResponse>;

  forgotPassword(
    request: ForgotPasswordRequest,
    metadata?: Metadata,
  ): Observable<ForgotPasswordResponse>;

  updatePassword(
    request: UpdatePasswordRequest,
    metadata?: Metadata,
  ): Observable<UpdatePasswordResponse>;

  login(request: LoginRequest, metadata?: Metadata): Observable<LoginResponse>;

  logout(
    request: LogoutRequest,
    metadata?: Metadata,
  ): Observable<LogoutResponse>;
}

export interface UsersServiceController {
  register(
    request: RegisterRequest,
    metadata?: Metadata,
  ):
    | Promise<RegisterResponse>
    | Observable<RegisterResponse>
    | RegisterResponse;

  findUser(
    request: ReadRequest,
    metadata?: Metadata,
  ): Promise<ReadResponse> | Observable<ReadResponse> | ReadResponse;

  verifyEmail(
    request: VerifyUserRequest,
    metadata?: Metadata,
  ):
    | Promise<VerifyUserResponse>
    | Observable<VerifyUserResponse>
    | VerifyUserResponse;

  verifyActivationLink(
    request: VerifyActivationLinkRequest,
    metadata?: Metadata,
  ):
    | Promise<VerifyActivationLinkResponse>
    | Observable<VerifyActivationLinkResponse>
    | VerifyActivationLinkResponse;

  sendVerificationCode(
    request: SendVerificationCodeRequest,
    metadata?: Metadata,
  ):
    | Promise<SendVerificationCodeResponse>
    | Observable<SendVerificationCodeResponse>
    | SendVerificationCodeResponse;

  updateUser(
    request: UpdateRequest,
    metadata?: Metadata,
  ): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  forgotPassword(
    request: ForgotPasswordRequest,
    metadata?: Metadata,
  ):
    | Promise<ForgotPasswordResponse>
    | Observable<ForgotPasswordResponse>
    | ForgotPasswordResponse;

  updatePassword(
    request: UpdatePasswordRequest,
    metadata?: Metadata,
  ):
    | Promise<UpdatePasswordResponse>
    | Observable<UpdatePasswordResponse>
    | UpdatePasswordResponse;

  login(
    request: LoginRequest,
    metadata?: Metadata,
  ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  logout(
    request: LogoutRequest,
    metadata?: Metadata,
  ): Promise<LogoutResponse> | Observable<LogoutResponse> | LogoutResponse;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'register',
      'findUser',
      'verifyEmail',
      'verifyActivationLink',
      'sendVerificationCode',
      'updateUser',
      'forgotPassword',
      'updatePassword',
      'login',
      'logout',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('UsersService', method)(
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
      GrpcStreamMethod('UsersService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const USERS_SERVICE_NAME = 'UsersService';

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
