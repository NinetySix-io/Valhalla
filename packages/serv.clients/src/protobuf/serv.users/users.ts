/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "serv.users";

export interface PasswordStruct {
  hashed: string;
}

export interface EmailObject {
  id: string;
  value: string;
  verificationCode?: string | undefined;
  isVerified: boolean;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PhoneObject {
  id: string;
  value: string;
  verificationCode?: string | undefined;
  isVerified: boolean;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  displayName?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  createdAt: string;
  updatedAt: string;
  emails: EmailObject[];
  phones: PhoneObject[];
}

export interface RegisterRequest {
  displayName?: string | undefined;
  password: string;
  email: string;
  phone?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
}

export interface RegisterResponse {
  activationLink: string;
  userId: string;
}

export interface DeleteRequest {
  id: string;
}

export interface DeleteResponse {
  success: boolean;
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

export interface LoginResponse {
  user: User | undefined;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  password: string;
  username: string;
}

export interface LogoutRequest {
  refreshToken?: string | undefined;
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

export interface FindUserRequest {
  userId?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
}

export const SERV_USERS_PACKAGE_NAME = "serv.users";

export interface UsersServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>;

  findUser(request: FindUserRequest): Observable<User>;

  verifyEmail(request: VerifyUserRequest): Observable<VerifyUserResponse>;

  verifyActivationLink(
    request: VerifyActivationLinkRequest
  ): Observable<VerifyActivationLinkResponse>;

  sendVerificationCode(
    request: SendVerificationCodeRequest
  ): Observable<SendVerificationCodeResponse>;

  updateUser(request: UpdateRequest): Observable<UpdateResponse>;

  forgotPassword(
    request: ForgotPasswordRequest
  ): Observable<ForgotPasswordResponse>;

  updatePassword(
    request: UpdatePasswordRequest
  ): Observable<UpdatePasswordResponse>;

  login(request: LoginRequest): Observable<LoginResponse>;

  logout(request: LogoutRequest): Observable<LogoutResponse>;
}

export interface UsersServiceController {
  register(
    request: RegisterRequest
  ):
    | Promise<RegisterResponse>
    | Observable<RegisterResponse>
    | RegisterResponse;

  findUser(request: FindUserRequest): Promise<User> | Observable<User> | User;

  verifyEmail(
    request: VerifyUserRequest
  ):
    | Promise<VerifyUserResponse>
    | Observable<VerifyUserResponse>
    | VerifyUserResponse;

  verifyActivationLink(
    request: VerifyActivationLinkRequest
  ):
    | Promise<VerifyActivationLinkResponse>
    | Observable<VerifyActivationLinkResponse>
    | VerifyActivationLinkResponse;

  sendVerificationCode(
    request: SendVerificationCodeRequest
  ):
    | Promise<SendVerificationCodeResponse>
    | Observable<SendVerificationCodeResponse>
    | SendVerificationCodeResponse;

  updateUser(
    request: UpdateRequest
  ): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  forgotPassword(
    request: ForgotPasswordRequest
  ):
    | Promise<ForgotPasswordResponse>
    | Observable<ForgotPasswordResponse>
    | ForgotPasswordResponse;

  updatePassword(
    request: UpdatePasswordRequest
  ):
    | Promise<UpdatePasswordResponse>
    | Observable<UpdatePasswordResponse>
    | UpdatePasswordResponse;

  login(
    request: LoginRequest
  ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  logout(
    request: LogoutRequest
  ): Promise<LogoutResponse> | Observable<LogoutResponse> | LogoutResponse;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "register",
      "findUser",
      "verifyEmail",
      "verifyActivationLink",
      "sendVerificationCode",
      "updateUser",
      "forgotPassword",
      "updatePassword",
      "login",
      "logout",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("UsersService", method)(
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
      GrpcStreamMethod("UsersService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const USERS_SERVICE_NAME = "UsersService";
