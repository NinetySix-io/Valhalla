/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";

export const protobufPackage = "serv.sites";

export enum SiteStatus {
  DEPLOYED = "DEPLOYED",
  PENDING = "PENDING",
  SUSPENDED = "SUSPENDED",
}

export enum PageStatus {
  ACTIVE = "ACTIVE",
  DRAFT = "DRAFT",
  ARCHIVED = "ARCHIVED",
  SCHEDULED = "SCHEDULED",
}

/**
 * -----------------------------
 * Entity
 * -----------------------------
 */
export interface Page {
  id: string;
  title: string;
  description: string;
  organization: string;
  site: string;
  status: PageStatus;
  isLoneTitle: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Site {
  id: string;
  name: string;
  createdBy: string;
  updatedBy: string;
  ownBy: string;
  status: SiteStatus;
  url?: string | undefined;
  createdAt: string;
  updatedAt: string;
}

/**
 * -----------------------------
 * PAGE
 * -----------------------------
 */
export interface CreatePageRequest {
  requestedUserId: string;
  organizationId: string;
  siteId: string;
  title: string;
}

export interface CreatePageResponse {
  page?: Page;
}

export interface GetPageRequest {
  organizationId: string;
  siteId: string;
  pageId: string;
}

export interface GetPageResponse {
  page?: Page | undefined;
}

export interface GetPageListRequest {
  organizationId: string;
  siteId: string;
}

export interface GetPageListResponse {
  pageList: Page[];
}

export interface UpdatePageRequest {
  organizationId: string;
  siteId: string;
  pageId: string;
  title?: string | undefined;
  description?: string | undefined;
}

export interface UpdatePageResponse {
  page?: Page;
}

export interface DeletePageRequest {
  organizationId: string;
  siteId: string;
  requestedUserId: string;
  pageId: string;
}

export interface DeletePageResponse {
  page?: Page;
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

export interface UpdateSiteRequest {
  requestedUser: string;
  organizationId: string;
  siteId: string;
  name?: string | undefined;
}

export interface UpdateSiteResponse {
  site?: Site;
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

  updateSite(request: UpdateSiteRequest): Observable<UpdateSiteResponse>;

  getSiteList(request: GetSiteListRequest): Observable<GetSiteListResponse>;

  createPage(request: CreatePageRequest): Observable<CreatePageResponse>;

  getPageList(request: GetPageListRequest): Observable<GetPageListResponse>;

  getPage(request: GetPageRequest): Observable<GetPageResponse>;

  updatePage(request: UpdatePageRequest): Observable<UpdatePageResponse>;

  deletePage(request: DeletePageRequest): Observable<DeletePageResponse>;
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

  updateSite(
    request: UpdateSiteRequest
  ):
    | Promise<UpdateSiteResponse>
    | Observable<UpdateSiteResponse>
    | UpdateSiteResponse;

  getSiteList(
    request: GetSiteListRequest
  ):
    | Promise<GetSiteListResponse>
    | Observable<GetSiteListResponse>
    | GetSiteListResponse;

  createPage(
    request: CreatePageRequest
  ):
    | Promise<CreatePageResponse>
    | Observable<CreatePageResponse>
    | CreatePageResponse;

  getPageList(
    request: GetPageListRequest
  ):
    | Promise<GetPageListResponse>
    | Observable<GetPageListResponse>
    | GetPageListResponse;

  getPage(
    request: GetPageRequest
  ): Promise<GetPageResponse> | Observable<GetPageResponse> | GetPageResponse;

  updatePage(
    request: UpdatePageRequest
  ):
    | Promise<UpdatePageResponse>
    | Observable<UpdatePageResponse>
    | UpdatePageResponse;

  deletePage(
    request: DeletePageRequest
  ):
    | Promise<DeletePageResponse>
    | Observable<DeletePageResponse>
    | DeletePageResponse;
}

export function SitesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createSite",
      "getSite",
      "updateSite",
      "getSiteList",
      "createPage",
      "getPageList",
      "getPage",
      "updatePage",
      "deletePage",
    ];
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
