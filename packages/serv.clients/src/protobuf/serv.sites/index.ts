/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";

export const protobufPackage = "serv.sites";

export enum SiteStatus {
  INACTIVE = "INACTIVE",
  DEPLOYED = "DEPLOYED",
  PENDING = "PENDING",
  SUSPENDED = "SUSPENDED",
}

export interface Site {
  id: string;
  name: string;
  createdBy: string;
  updatedBy: string;
  ownBy: string;
  status: SiteStatus;
  url?: string | undefined;
}

export interface CreateSiteRequest {
  name: string;
  owner: string;
  requestedUser: string;
  logoUrl?: string | undefined;
  faviconUrl?: string | undefined;
}

export interface CreateSiteResponse {
  siteId: string;
  status: SiteStatus;
}

export interface GetSiteRequest {
  siteId: string;
}

export interface GetSiteResponse {
  site?: Site;
}

export interface GetSiteListRequest {
  query?: { $case: "ownBy"; ownBy: string };
}

export interface GetSiteListResponse {
  sites: Site[];
}

export const SERV_SITES_PACKAGE_NAME = "serv.sites";

export interface SitesServiceClient {
  createSite(request: CreateSiteRequest): Observable<CreateSiteResponse>;

  getSite(request: GetSiteRequest): Observable<GetSiteResponse>;

  getSiteList(request: GetSiteListRequest): Observable<GetSiteListResponse>;
}

export interface SitesServiceController {
  createSite(
    request: CreateSiteRequest
  ):
    | Promise<CreateSiteResponse>
    | Observable<CreateSiteResponse>
    | CreateSiteResponse;

  getSite(
    request: GetSiteRequest
  ): Promise<GetSiteResponse> | Observable<GetSiteResponse> | GetSiteResponse;

  getSiteList(
    request: GetSiteListRequest
  ):
    | Promise<GetSiteListResponse>
    | Observable<GetSiteListResponse>
    | GetSiteListResponse;
}

export function SitesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createSite", "getSite", "getSiteList"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("SitesService", method)(
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
      GrpcStreamMethod("SitesService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const SITES_SERVICE_NAME = "SitesService";

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
