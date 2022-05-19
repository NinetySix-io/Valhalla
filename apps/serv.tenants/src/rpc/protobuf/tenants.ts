/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'serv.tenants';

export enum InvitationStatus {
  PENDING = 0,
  ACCEPTED = 1,
  REJECTED = 2,
  UNRECOGNIZED = -1,
}

export enum TenantRole {
  OWNER = 0,
  ADMIN = 1,
  DEVELOPER = 2,
  MEMBER = 3,
  GUESS = 4,
  UNRECOGNIZED = -1,
}

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateTenantPayload {
  name: string;
}

export interface TenantMember {
  id: string;
  user: string;
  tenant: string;
  invitedBy: string;
  status: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTenantRequest {
  name: string;
}

export interface CreateTenantResponse {
  tenant: Tenant | undefined;
}

export interface TenantAvailableRequest {
  name: string;
}

export interface TenantAvailableResponse {
  available: boolean;
}

export interface DeleteTenantRequest {
  tenantId: string;
}

export interface DeleteTenantResponse {
  tenant: Tenant | undefined;
}

export interface GetTenantRequest {
  tenantId: string;
}

export interface GetTenantResponse {
  tenant: Tenant | undefined;
}

export interface UpdateTenantRequest {
  id: string;
  data: UpdateTenantPayload | undefined;
}

export interface UpdateTenantResponse {
  tenant: Tenant | undefined;
}

/** Tenant Members */
export interface InviteMemberRequest {
  email: string;
  userId: string;
  role: string;
}

export interface InviteMemberResponse {
  member: TenantMember | undefined;
}

export interface DeleteMemberRequest {
  id: string;
}

export interface DeleteMemberResponse {
  member: TenantMember | undefined;
}

export interface GetMemberRequest {
  tenantId: string;
  memberId: string;
}

export interface GetMemberResponse {
  member: TenantMember | undefined;
}

export interface UpdateMemberRequest {
  id: string;
  status: string;
  role: string;
}

export interface UpdateMemberResponse {
  member: TenantMember | undefined;
}

export interface AcceptMemberInvitationRequest {
  token: string;
}

export interface AcceptMemberInvitationResponse {
  member: TenantMember | undefined;
}

export const SERV_TENANTS_PACKAGE_NAME = 'serv.tenants';

export interface TenantsServiceClient {
  /** Tenants */

  createTenant(
    request: CreateTenantRequest,
    metadata?: Metadata,
  ): Observable<CreateTenantResponse>;

  getTenant(
    request: GetTenantRequest,
    metadata?: Metadata,
  ): Observable<GetTenantResponse>;

  updateTenant(
    request: UpdateTenantRequest,
    metadata?: Metadata,
  ): Observable<UpdateTenantResponse>;

  deleteTenant(
    request: DeleteTenantRequest,
    metadata?: Metadata,
  ): Observable<DeleteTenantResponse>;

  tenantAvailable(
    request: TenantAvailableRequest,
    metadata?: Metadata,
  ): Observable<TenantAvailableResponse>;

  /** Members */

  inviteMember(
    request: InviteMemberRequest,
    metadata?: Metadata,
  ): Observable<InviteMemberResponse>;

  acceptMemberInvitation(
    request: AcceptMemberInvitationRequest,
    metadata?: Metadata,
  ): Observable<AcceptMemberInvitationResponse>;

  updateMember(
    request: UpdateMemberRequest,
    metadata?: Metadata,
  ): Observable<UpdateMemberResponse>;

  deleteMember(
    request: DeleteMemberRequest,
    metadata?: Metadata,
  ): Observable<DeleteMemberResponse>;

  getMember(
    request: GetMemberRequest,
    metadata?: Metadata,
  ): Observable<GetMemberResponse>;
}

export interface TenantsServiceController {
  /** Tenants */

  createTenant(
    request: CreateTenantRequest,
    metadata?: Metadata,
  ):
    | Promise<CreateTenantResponse>
    | Observable<CreateTenantResponse>
    | CreateTenantResponse;

  getTenant(
    request: GetTenantRequest,
    metadata?: Metadata,
  ):
    | Promise<GetTenantResponse>
    | Observable<GetTenantResponse>
    | GetTenantResponse;

  updateTenant(
    request: UpdateTenantRequest,
    metadata?: Metadata,
  ):
    | Promise<UpdateTenantResponse>
    | Observable<UpdateTenantResponse>
    | UpdateTenantResponse;

  deleteTenant(
    request: DeleteTenantRequest,
    metadata?: Metadata,
  ):
    | Promise<DeleteTenantResponse>
    | Observable<DeleteTenantResponse>
    | DeleteTenantResponse;

  tenantAvailable(
    request: TenantAvailableRequest,
    metadata?: Metadata,
  ):
    | Promise<TenantAvailableResponse>
    | Observable<TenantAvailableResponse>
    | TenantAvailableResponse;

  /** Members */

  inviteMember(
    request: InviteMemberRequest,
    metadata?: Metadata,
  ):
    | Promise<InviteMemberResponse>
    | Observable<InviteMemberResponse>
    | InviteMemberResponse;

  acceptMemberInvitation(
    request: AcceptMemberInvitationRequest,
    metadata?: Metadata,
  ):
    | Promise<AcceptMemberInvitationResponse>
    | Observable<AcceptMemberInvitationResponse>
    | AcceptMemberInvitationResponse;

  updateMember(
    request: UpdateMemberRequest,
    metadata?: Metadata,
  ):
    | Promise<UpdateMemberResponse>
    | Observable<UpdateMemberResponse>
    | UpdateMemberResponse;

  deleteMember(
    request: DeleteMemberRequest,
    metadata?: Metadata,
  ):
    | Promise<DeleteMemberResponse>
    | Observable<DeleteMemberResponse>
    | DeleteMemberResponse;

  getMember(
    request: GetMemberRequest,
    metadata?: Metadata,
  ):
    | Promise<GetMemberResponse>
    | Observable<GetMemberResponse>
    | GetMemberResponse;
}

export function TenantsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createTenant',
      'getTenant',
      'updateTenant',
      'deleteTenant',
      'tenantAvailable',
      'inviteMember',
      'acceptMemberInvitation',
      'updateMember',
      'deleteMember',
      'getMember',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('TenantsService', method)(
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
      GrpcStreamMethod('TenantsService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const TENANTS_SERVICE_NAME = 'TenantsService';

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
