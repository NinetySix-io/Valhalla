/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "serv.orgs";

export enum InvitationStatus {
  PENDING = 0,
  ACCEPTED = 1,
  REJECTED = 2,
  UNRECOGNIZED = -1,
}

export enum OrgRole {
  OWNER = 0,
  ADMIN = 1,
  DEVELOPER = 2,
  MEMBER = 3,
  GUESS = 4,
  UNRECOGNIZED = -1,
}

export interface Organization {
  id: string;
  slug: string;
  name: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateOrgPayload {
  name: string;
}

export interface OrgMember {
  id: string;
  user: string;
  organization: string;
  invitedBy: string;
  status: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrgRequest {
  name: string;
}

export interface CreateOrgResponse {
  Organization: Organization | undefined;
}

export interface OrgAvailableRequest {
  name: string;
}

export interface OrgAvailableResponse {
  available: boolean;
}

export interface DeleteOrgRequest {
  OrgId: string;
}

export interface DeleteOrgResponse {
  Organization: Organization | undefined;
}

export interface GetOrgRequest {
  OrgId: string;
}

export interface GetOrgResponse {
  Organization: Organization | undefined;
}

export interface UpdateOrgRequest {
  id: string;
  data: UpdateOrgPayload | undefined;
}

export interface UpdateOrgResponse {
  Organization: Organization | undefined;
}

/** Org OrgMembers */
export interface InviteOrgMemberRequest {
  email: string;
  userId: string;
  role: string;
}

export interface InviteOrgMemberResponse {
  OrgMember: OrgMember | undefined;
}

export interface DeleteOrgMemberRequest {
  id: string;
}

export interface DeleteOrgMemberResponse {
  OrgMember: OrgMember | undefined;
}

export interface GetOrgMemberRequest {
  OrgId: string;
  OrgMemberId: string;
}

export interface GetOrgMemberResponse {
  OrgMember: OrgMember | undefined;
}

export interface UpdateOrgMemberRequest {
  id: string;
  status: string;
  role: string;
}

export interface UpdateOrgMemberResponse {
  OrgMember: OrgMember | undefined;
}

export interface AcceptOrgMemberInvitationRequest {
  token: string;
}

export interface AcceptOrgMemberInvitationResponse {
  OrgMember: OrgMember | undefined;
}

export const SERV_ORGS_PACKAGE_NAME = "serv.orgs";

export interface OrgsServiceClient {
  /** Orgs */

  createOrg(request: CreateOrgRequest): Observable<CreateOrgResponse>;

  getOrg(request: GetOrgRequest): Observable<GetOrgResponse>;

  updateOrg(request: UpdateOrgRequest): Observable<UpdateOrgResponse>;

  deleteOrg(request: DeleteOrgRequest): Observable<DeleteOrgResponse>;

  orgAvailable(request: OrgAvailableRequest): Observable<OrgAvailableResponse>;

  /** OrgMembers */

  inviteOrgMember(
    request: InviteOrgMemberRequest
  ): Observable<InviteOrgMemberResponse>;

  acceptOrgMemberInvitation(
    request: AcceptOrgMemberInvitationRequest
  ): Observable<AcceptOrgMemberInvitationResponse>;

  updateOrgMember(
    request: UpdateOrgMemberRequest
  ): Observable<UpdateOrgMemberResponse>;

  deleteOrgMember(
    request: DeleteOrgMemberRequest
  ): Observable<DeleteOrgMemberResponse>;

  getOrgMember(request: GetOrgMemberRequest): Observable<GetOrgMemberResponse>;
}

export interface OrgsServiceController {
  /** Orgs */

  createOrg(
    request: CreateOrgRequest
  ):
    | Promise<CreateOrgResponse>
    | Observable<CreateOrgResponse>
    | CreateOrgResponse;

  getOrg(
    request: GetOrgRequest
  ): Promise<GetOrgResponse> | Observable<GetOrgResponse> | GetOrgResponse;

  updateOrg(
    request: UpdateOrgRequest
  ):
    | Promise<UpdateOrgResponse>
    | Observable<UpdateOrgResponse>
    | UpdateOrgResponse;

  deleteOrg(
    request: DeleteOrgRequest
  ):
    | Promise<DeleteOrgResponse>
    | Observable<DeleteOrgResponse>
    | DeleteOrgResponse;

  orgAvailable(
    request: OrgAvailableRequest
  ):
    | Promise<OrgAvailableResponse>
    | Observable<OrgAvailableResponse>
    | OrgAvailableResponse;

  /** OrgMembers */

  inviteOrgMember(
    request: InviteOrgMemberRequest
  ):
    | Promise<InviteOrgMemberResponse>
    | Observable<InviteOrgMemberResponse>
    | InviteOrgMemberResponse;

  acceptOrgMemberInvitation(
    request: AcceptOrgMemberInvitationRequest
  ):
    | Promise<AcceptOrgMemberInvitationResponse>
    | Observable<AcceptOrgMemberInvitationResponse>
    | AcceptOrgMemberInvitationResponse;

  updateOrgMember(
    request: UpdateOrgMemberRequest
  ):
    | Promise<UpdateOrgMemberResponse>
    | Observable<UpdateOrgMemberResponse>
    | UpdateOrgMemberResponse;

  deleteOrgMember(
    request: DeleteOrgMemberRequest
  ):
    | Promise<DeleteOrgMemberResponse>
    | Observable<DeleteOrgMemberResponse>
    | DeleteOrgMemberResponse;

  getOrgMember(
    request: GetOrgMemberRequest
  ):
    | Promise<GetOrgMemberResponse>
    | Observable<GetOrgMemberResponse>
    | GetOrgMemberResponse;
}

export function OrgsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createOrg",
      "getOrg",
      "updateOrg",
      "deleteOrg",
      "orgAvailable",
      "inviteOrgMember",
      "acceptOrgMemberInvitation",
      "updateOrgMember",
      "deleteOrgMember",
      "getOrgMember",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("OrgsService", method)(
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
      GrpcStreamMethod("OrgsService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const ORGS_SERVICE_NAME = "OrgsService";
