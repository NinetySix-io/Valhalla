/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "serv.access";

export interface CreateAccessRequest {
  userId: string;
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

export interface DecodeAccessTokenResponse {
  userId: string;
}

export interface RenewAccessTokenRequest {
  refreshToken: string;
}

export interface RenewAccessTokenResponse {
  accessToken: string;
}

export interface ReadAccessRequest {
  refreshToken: string;
}

export interface ReadAccessResponse {
  userId: string;
}

export const SERV_ACCESS_PACKAGE_NAME = "serv.access";

export interface AccessServiceClient {
  createAccess(request: CreateAccessRequest): Observable<CreateAccessResponse>;

  readAccess(request: ReadAccessRequest): Observable<ReadAccessResponse>;

  deleteRefreshToken(
    request: DeleteRefreshTokenRequest
  ): Observable<DeleteRefreshTokenResponse>;

  renewAccessToken(
    request: RenewAccessTokenRequest
  ): Observable<RenewAccessTokenResponse>;

  decodeAccessToken(
    request: DecodeAccessTokenRequest
  ): Observable<DecodeAccessTokenResponse>;
}

export interface AccessServiceController {
  createAccess(
    request: CreateAccessRequest
  ):
    | Promise<CreateAccessResponse>
    | Observable<CreateAccessResponse>
    | CreateAccessResponse;

  readAccess(
    request: ReadAccessRequest
  ):
    | Promise<ReadAccessResponse>
    | Observable<ReadAccessResponse>
    | ReadAccessResponse;

  deleteRefreshToken(
    request: DeleteRefreshTokenRequest
  ):
    | Promise<DeleteRefreshTokenResponse>
    | Observable<DeleteRefreshTokenResponse>
    | DeleteRefreshTokenResponse;

  renewAccessToken(
    request: RenewAccessTokenRequest
  ):
    | Promise<RenewAccessTokenResponse>
    | Observable<RenewAccessTokenResponse>
    | RenewAccessTokenResponse;

  decodeAccessToken(
    request: DecodeAccessTokenRequest
  ):
    | Promise<DecodeAccessTokenResponse>
    | Observable<DecodeAccessTokenResponse>
    | DecodeAccessTokenResponse;
}

export function AccessServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createAccess",
      "readAccess",
      "deleteRefreshToken",
      "renewAccessToken",
      "decodeAccessToken",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("AccessService", method)(
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
      GrpcStreamMethod("AccessService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const ACCESS_SERVICE_NAME = "AccessService";
