/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'io.valhalla.serv.iam';

export interface Access {
  id: string;
  token: string;
  tenantId: string;
  scopes: string[];
  name: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  createdBy: string;
}

export interface CreateAccessRequest {
  tenantId: string;
  scopes: string[];
  name: string;
  expiresAt: string;
}

export interface CreateAccessResponse {
  accessToken: Access | undefined;
}

export interface DeleteAccessRequest {
  id: string;
  tenantId: string;
}

export interface DeleteAccessResponse {
  accessToken: Access | undefined;
}

export interface ReadAccessRequest {
  id: string;
  tenantId: string;
}

export interface ReadAccessResponse {
  accessToken: Access | undefined;
}

export interface FindAccessRequest {
  filter: string;
  tenantId: string;
}

export interface FindAccessResponse {
  accessTokens: Access[];
}

export interface HasRightsRequest {
  token: string;
  scope: string;
  tenantId: string;
}

export interface HasRightsResponse {
  hasAccess: boolean;
}

export const IO_VALHALLA_SERV_IAM_PACKAGE_NAME = 'io.valhalla.serv.iam';

export interface IamServiceClient {
  createAccess(
    request: CreateAccessRequest,
    metadata?: Metadata,
  ): Observable<CreateAccessResponse>;

  deleteAccess(
    request: DeleteAccessRequest,
    metadata?: Metadata,
  ): Observable<DeleteAccessResponse>;

  readAccess(
    request: ReadAccessRequest,
    metadata?: Metadata,
  ): Observable<ReadAccessResponse>;

  findAccess(
    request: FindAccessRequest,
    metadata?: Metadata,
  ): Observable<FindAccessResponse>;

  hasRights(
    request: HasRightsRequest,
    metadata?: Metadata,
  ): Observable<HasRightsResponse>;
}

export interface IamServiceController {
  createAccess(
    request: CreateAccessRequest,
    metadata?: Metadata,
  ):
    | Promise<CreateAccessResponse>
    | Observable<CreateAccessResponse>
    | CreateAccessResponse;

  deleteAccess(
    request: DeleteAccessRequest,
    metadata?: Metadata,
  ):
    | Promise<DeleteAccessResponse>
    | Observable<DeleteAccessResponse>
    | DeleteAccessResponse;

  readAccess(
    request: ReadAccessRequest,
    metadata?: Metadata,
  ):
    | Promise<ReadAccessResponse>
    | Observable<ReadAccessResponse>
    | ReadAccessResponse;

  findAccess(
    request: FindAccessRequest,
    metadata?: Metadata,
  ):
    | Promise<FindAccessResponse>
    | Observable<FindAccessResponse>
    | FindAccessResponse;

  hasRights(
    request: HasRightsRequest,
    metadata?: Metadata,
  ):
    | Promise<HasRightsResponse>
    | Observable<HasRightsResponse>
    | HasRightsResponse;
}

export function IamServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createAccess',
      'deleteAccess',
      'readAccess',
      'findAccess',
      'hasRights',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('IamService', method)(
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
      GrpcStreamMethod('IamService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const IAM_SERVICE_NAME = 'IamService';

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
