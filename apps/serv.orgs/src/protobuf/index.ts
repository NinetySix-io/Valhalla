/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";

export const protobufPackage = "serv.orgs";

export enum OrgPlan {
  FREE = 0,
  UNRECOGNIZED = -1,
}

export enum OrgStatus {
  ACTIVE = 0,
  INACTIVE = 1,
  SUSPENDED = 2,
  UNRECOGNIZED = -1,
}

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

export interface GetUserMembershipsRequest {
  userId: string;
}

export interface GetUserMembershipsResponse {
  organizations: Organization[];
}

export interface Organization {
  id: string;
  slug: string;
  name: string;
  createdBy: string;
  createdAt: string;
  updateBy: string;
  updatedAt: string;
  logoUrl: string;
  status: OrgStatus;
}

export interface UpdateOrgLogoRequest {
  imageUrl: string;
  orgId: string;
  requestedUserId: string;
}

export interface UpdateOrgPlanRequest {
  plan: OrgPlan;
  orgId: string;
  requestedUserId: string;
}

export interface Member {
  id: string;
  user: string;
  organization: string;
  invitedBy: string;
  status: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  profileImageUrl: string;
}

export interface CreateOrgRequest {
  name: string;
  requestedUserId: string;
  plan: OrgPlan;
}

export interface ArchiveOrgRequest {
  orgId: string;
  requestedUserId: string;
}

export interface RestoreOrgRequest {
  orgId: string;
  requestedUserId: string;
}

export interface GetOrgRequest {
  orgId: string;
}

export interface InviteMemberRequest {
  email: string;
  userId: string;
  role: string;
}

export interface InviteMemberResponse {
  member: Member | undefined;
}

export interface MarkDeleteMemberRequest {
  orgId: string;
  memberId: string;
  requestedUserId: string;
}

export interface MarkDeleteMemberResponse {
  member: Member | undefined;
}

export interface GetMemberRequest {
  orgId: string;
  userId: string;
}

export interface AcceptMemberInvitationRequest {
  token: string;
}

export interface AcceptMemberInvitationResponse {
  member: Member | undefined;
}

export const SERV_ORGS_PACKAGE_NAME = "serv.orgs";

export interface OrgsServiceClient {
  createOrg(request: CreateOrgRequest): Observable<Organization>;

  getOrg(request: GetOrgRequest): Observable<Organization>;

  archiveOrg(request: ArchiveOrgRequest): Observable<Organization>;

  restoreOrg(request: RestoreOrgRequest): Observable<Organization>;

  updateOrgPlan(request: UpdateOrgPlanRequest): Observable<Organization>;

  updateOrgLogo(request: UpdateOrgLogoRequest): Observable<Organization>;

  /**
   * rpc InviteMember(InviteMemberRequest) returns (InviteMemberResponse) {}
   * rpc AcceptMemberInvitation(AcceptMemberInvitationRequest) returns (AcceptMemberInvitationResponse) {}
   */

  markDeleteMember(
    request: MarkDeleteMemberRequest
  ): Observable<MarkDeleteMemberResponse>;

  getMember(request: GetMemberRequest): Observable<Member>;

  getUserMemberships(
    request: GetUserMembershipsRequest
  ): Observable<GetUserMembershipsResponse>;
}

export interface OrgsServiceController {
  createOrg(
    request: CreateOrgRequest
  ): Promise<Organization> | Observable<Organization> | Organization;

  getOrg(
    request: GetOrgRequest
  ): Promise<Organization> | Observable<Organization> | Organization;

  archiveOrg(
    request: ArchiveOrgRequest
  ): Promise<Organization> | Observable<Organization> | Organization;

  restoreOrg(
    request: RestoreOrgRequest
  ): Promise<Organization> | Observable<Organization> | Organization;

  updateOrgPlan(
    request: UpdateOrgPlanRequest
  ): Promise<Organization> | Observable<Organization> | Organization;

  updateOrgLogo(
    request: UpdateOrgLogoRequest
  ): Promise<Organization> | Observable<Organization> | Organization;

  /**
   * rpc InviteMember(InviteMemberRequest) returns (InviteMemberResponse) {}
   * rpc AcceptMemberInvitation(AcceptMemberInvitationRequest) returns (AcceptMemberInvitationResponse) {}
   */

  markDeleteMember(
    request: MarkDeleteMemberRequest
  ):
    | Promise<MarkDeleteMemberResponse>
    | Observable<MarkDeleteMemberResponse>
    | MarkDeleteMemberResponse;

  getMember(
    request: GetMemberRequest
  ): Promise<Member> | Observable<Member> | Member;

  getUserMemberships(
    request: GetUserMembershipsRequest
  ):
    | Promise<GetUserMembershipsResponse>
    | Observable<GetUserMembershipsResponse>
    | GetUserMembershipsResponse;
}

export function OrgsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createOrg",
      "getOrg",
      "archiveOrg",
      "restoreOrg",
      "updateOrgPlan",
      "updateOrgLogo",
      "markDeleteMember",
      "getMember",
      "getUserMemberships",
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
