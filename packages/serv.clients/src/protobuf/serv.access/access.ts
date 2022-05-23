/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'serv.access';

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

export const SERV_ACCESS_PACKAGE_NAME = 'serv.access';

export interface AccessServiceClient {
  createAccess(
    request: CreateAccessRequest,
    metadata?: Metadata,
  ): Observable<CreateAccessResponse>;

  readAccess(
    request: ReadAccessRequest,
    metadata?: Metadata,
  ): Observable<ReadAccessResponse>;

  deleteRefreshToken(
    request: DeleteRefreshTokenRequest,
    metadata?: Metadata,
  ): Observable<DeleteRefreshTokenResponse>;

  renewAccessToken(
    request: RenewAccessTokenRequest,
    metadata?: Metadata,
  ): Observable<RenewAccessTokenResponse>;

  decodeAccessToken(
    request: DecodeAccessTokenRequest,
    metadata?: Metadata,
  ): Observable<DecodeAccessTokenResponse>;
}

export interface AccessServiceController {
  createAccess(
    request: CreateAccessRequest,
    metadata?: Metadata,
  ):
    | Promise<CreateAccessResponse>
    | Observable<CreateAccessResponse>
    | CreateAccessResponse;

  readAccess(
    request: ReadAccessRequest,
    metadata?: Metadata,
  ):
    | Promise<ReadAccessResponse>
    | Observable<ReadAccessResponse>
    | ReadAccessResponse;

  deleteRefreshToken(
    request: DeleteRefreshTokenRequest,
    metadata?: Metadata,
  ):
    | Promise<DeleteRefreshTokenResponse>
    | Observable<DeleteRefreshTokenResponse>
    | DeleteRefreshTokenResponse;

  renewAccessToken(
    request: RenewAccessTokenRequest,
    metadata?: Metadata,
  ):
    | Promise<RenewAccessTokenResponse>
    | Observable<RenewAccessTokenResponse>
    | RenewAccessTokenResponse;

  decodeAccessToken(
    request: DecodeAccessTokenRequest,
    metadata?: Metadata,
  ):
    | Promise<DecodeAccessTokenResponse>
    | Observable<DecodeAccessTokenResponse>
    | DecodeAccessTokenResponse;
}

export function AccessServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createAccess',
      'readAccess',
      'deleteRefreshToken',
      'renewAccessToken',
      'decodeAccessToken',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('AccessService', method)(
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
      GrpcStreamMethod('AccessService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const ACCESS_SERVICE_NAME = 'AccessService';

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
