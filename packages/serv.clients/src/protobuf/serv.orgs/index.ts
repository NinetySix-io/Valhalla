/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";

export const protobufPackage = "serv.orgs";

export enum OrgPlan {
  FREE = "FREE",
}

export enum OrgStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
}

export enum InvitationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export enum OrgRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  DEVELOPER = "DEVELOPER",
  MEMBER = "MEMBER",
  GUESS = "GUESS",
}

export interface AccountSettings {
  activeOrganizationId: string;
}

export interface GetAccountActiveOrgRequest {
  accountId: string;
}

export interface GetAccountActiveOrgResponse {
  organization?: Organization | undefined;
}

export interface SetAccountActiveOrgRequest {
  accountId: string;
  organizationId: string;
}

export interface SetAccountActiveOrgResponse {
  success: boolean;
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
  logoUrl?: string | undefined;
  status: OrgStatus;
  plan: OrgPlan;
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
  invitedBy?: string | undefined;
  status: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  profileImageUrl?: string | undefined;
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
  query?:
    | { $case: "orgId"; orgId: string }
    | { $case: "orgSlug"; orgSlug: string };
}

export interface GetOrgResponse {
  organization?: Organization | undefined;
}

export interface MarkDeleteMemberRequest {
  orgId: string;
  memberId: string;
  requestedUserId: string;
}

export interface MarkDeleteMemberResponse {
  member?: Member;
}

export interface GetMemberRequest {
  orgId: string;
  userId: string;
}

export interface GetMemberResponse {
  member?: Member | undefined;
}

export const SERV_ORGS_PACKAGE_NAME = "serv.orgs";

export interface OrgsServiceClient {
  createOrg(request: CreateOrgRequest): Observable<Organization>;

  getOrg(request: GetOrgRequest): Observable<GetOrgResponse>;

  archiveOrg(request: ArchiveOrgRequest): Observable<Organization>;

  restoreOrg(request: RestoreOrgRequest): Observable<Organization>;

  updateOrgPlan(request: UpdateOrgPlanRequest): Observable<Organization>;

  updateOrgLogo(request: UpdateOrgLogoRequest): Observable<Organization>;

  setAccountActiveOrg(
    request: SetAccountActiveOrgRequest
  ): Observable<SetAccountActiveOrgResponse>;

  getAccountActiveOrg(
    request: GetAccountActiveOrgRequest
  ): Observable<GetAccountActiveOrgResponse>;

  markDeleteMember(
    request: MarkDeleteMemberRequest
  ): Observable<MarkDeleteMemberResponse>;

  getMember(request: GetMemberRequest): Observable<GetMemberResponse>;

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
  ): Promise<GetOrgResponse> | Observable<GetOrgResponse> | GetOrgResponse;

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

  setAccountActiveOrg(
    request: SetAccountActiveOrgRequest
  ):
    | Promise<SetAccountActiveOrgResponse>
    | Observable<SetAccountActiveOrgResponse>
    | SetAccountActiveOrgResponse;

  getAccountActiveOrg(
    request: GetAccountActiveOrgRequest
  ):
    | Promise<GetAccountActiveOrgResponse>
    | Observable<GetAccountActiveOrgResponse>
    | GetAccountActiveOrgResponse;

  markDeleteMember(
    request: MarkDeleteMemberRequest
  ):
    | Promise<MarkDeleteMemberResponse>
    | Observable<MarkDeleteMemberResponse>
    | MarkDeleteMemberResponse;

  getMember(
    request: GetMemberRequest
  ):
    | Promise<GetMemberResponse>
    | Observable<GetMemberResponse>
    | GetMemberResponse;

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
      "setAccountActiveOrg",
      "getAccountActiveOrg",
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
