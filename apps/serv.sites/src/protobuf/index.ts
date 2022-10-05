/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "serv.sites";

/**
 * -----------------------------
 * ENUMS
 * -----------------------------
 */
export enum SiteStatus {
  DEPLOYED = "DEPLOYED",
  PENDING = "PENDING",
  SUSPENDED = "SUSPENDED",
}

export enum EditStatus {
  ACTIVE = "ACTIVE",
  DRAFT = "DRAFT",
  ARCHIVED = "ARCHIVED",
}

export interface Page {
  id: string;
  title: string;
  description?: string | undefined;
  site: string;
  status: EditStatus;
  isLoneTitle?: boolean | undefined;
  createdBy: string;
  updatedBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  slug?: string | undefined;
}

export interface Site {
  id: string;
  name: string;
  createdBy: string;
  updatedBy: string;
  status: SiteStatus;
  url?: string | undefined;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SectionFormat {
  rowsCount?: number | undefined;
  columnGap?: number | undefined;
  rowGap?: number | undefined;
}

export interface PageSection {
  id: string;
  format?: SectionFormat;
  updatedBy: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PageElementPlatform {
  x: number;
  y: number;
  height: number;
  width: number;
  isVisible: boolean;
}

export interface PageElement {
  id: string;
  desktop?: PageElementPlatform;
  tablet?: PageElementPlatform | undefined;
  mobile?: PageElementPlatform | undefined;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * -----------------------------
 * PAGE
 * -----------------------------
 */
export interface CreatePageRequest {
  requestedUserId: string;
  siteId: string;
  title?: string | undefined;
}

export interface CreatePageResponse {
  data?: Page;
}

export interface GetPageRequest {
  pageId: string;
}

export interface GetPageResponse {
  data?: Page | undefined;
}

export interface GetPageListRequest {
  siteId: string;
}

export interface GetPageListResponse {
  data: Page[];
}

export interface UpdatePageRequest {
  requestedUserId: string;
  pageId: string;
  title?: string | undefined;
  description?: string | undefined;
  isLoneTitle?: boolean | undefined;
}

export interface UpdatePageResponse {
  data?: Page;
}

export interface DeletePageRequest {
  requestedUserId: string;
  pageId: string;
}

export interface DeletePageResponse {
  data?: Page;
}

export interface ArchivePageRequest {
  pageId: string;
  requestedUserId: string;
}

export interface ArchivePageResponse {
  data?: Page;
}

export interface CreateSiteRequest {
  name: string;
  ownerId: string;
  requestedUserId: string;
  logoUrl?: string | undefined;
  faviconUrl?: string | undefined;
}

export interface CreateSiteResponse {
  data?: Site;
}

export interface UpdateSiteRequest {
  requestedUserId: string;
  siteId: string;
  name?: string | undefined;
}

export interface UpdateSiteResponse {
  data?: Site;
}

export interface GetSiteRequest {
  siteId: string;
}

export interface GetSiteResponse {
  data?: Site;
}

export interface GetSiteListRequest {
  ownerId: string;
}

export interface GetSiteListResponse {
  data: Site[];
}

export interface SuspendSiteRequest {
  requestedUserId: string;
  siteId: string;
}

export interface SuspendSiteResponse {
  data?: Site;
}

export interface GetPageSectionRequest {
  sectionId: string;
}

export interface GetPageSectionResponse {
  data?: PageSection;
}

export interface GetPageSectionListRequest {
  pageId: string;
}

export interface GetPageSectionListResponse {
  data: PageSection[];
}

export interface CreateSectionRequest {
  pageId: string;
  requestedUserId: string;
  index?: number | undefined;
}

export interface CreateSectionResponse {
  data?: PageSection;
}

export interface UpdateSectionIndexRequest {
  pageId: string;
  sectionId: string;
  requestedUserId: string;
  index: number;
}

export interface UpdateSectionFormatRequest {
  pageId: string;
  sectionId: string;
  requestedUserId: string;
  format?: SectionFormat;
}

export interface UpdateSectionResponse {
  data?: PageSection;
}

export interface DeleteSectionRequest {
  pageId: string;
  sectionId: string;
  requestedUserId: string;
}

export interface DeleteSectionResponse {
  data?: PageSection;
}

export interface DeletePageElementListRequest {
  sectionId: string;
  requestedUserId: string;
}

export interface DeletePageElementListResponse {
  data: PageElement[];
}

export interface DeleteManyPageElementsRequest {
  elementIdList: string[];
  requestedUserId: string;
}

export interface DeleteManyPageElementsResponse {
  data: PageElement[];
}

export const SERV_SITES_PACKAGE_NAME = "serv.sites";

export interface SitesServiceClient {
  /**
   * -----------------------------
   * SITE
   * -----------------------------
   */

  createSite(request: CreateSiteRequest): Observable<CreateSiteResponse>;

  getSite(request: GetSiteRequest): Observable<GetSiteResponse>;

  updateSite(request: UpdateSiteRequest): Observable<UpdateSiteResponse>;

  getSiteList(request: GetSiteListRequest): Observable<GetSiteListResponse>;

  suspendSite(request: SuspendSiteRequest): Observable<SuspendSiteResponse>;

  /**
   * -----------------------------
   * PAGE
   * -----------------------------
   */

  createPage(request: CreatePageRequest): Observable<CreatePageResponse>;

  getPageList(request: GetPageListRequest): Observable<GetPageListResponse>;

  getPage(request: GetPageRequest): Observable<GetPageResponse>;

  updatePage(request: UpdatePageRequest): Observable<UpdatePageResponse>;

  deletePage(request: DeletePageRequest): Observable<DeletePageResponse>;

  archivePage(request: ArchivePageRequest): Observable<ArchivePageResponse>;

  /**
   * -----------------------------
   * SECTION
   * -----------------------------
   */

  getPageSection(request: GetPageSectionRequest): Observable<GetPageSectionResponse>;

  getPageSectionList(request: GetPageSectionListRequest): Observable<GetPageSectionListResponse>;

  createSection(request: CreateSectionRequest): Observable<CreateSectionResponse>;

  updateSectionIndex(request: UpdateSectionIndexRequest): Observable<UpdateSectionResponse>;

  updateSectionFormat(request: UpdateSectionFormatRequest): Observable<UpdateSectionResponse>;

  deleteSection(request: DeleteSectionRequest): Observable<DeleteSectionResponse>;

  /**
   * -----------------------------
   * ELEMENTS
   * -----------------------------
   */

  deletePageElementList(request: DeletePageElementListRequest): Observable<DeletePageElementListResponse>;

  deleteManyPageElements(request: DeleteManyPageElementsRequest): Observable<DeleteManyPageElementsResponse>;
}

export interface SitesServiceController {
  /**
   * -----------------------------
   * SITE
   * -----------------------------
   */

  createSite(
    request: CreateSiteRequest,
  ): Promise<CreateSiteResponse> | Observable<CreateSiteResponse> | CreateSiteResponse;

  getSite(request: GetSiteRequest): Promise<GetSiteResponse> | Observable<GetSiteResponse> | GetSiteResponse;

  updateSite(
    request: UpdateSiteRequest,
  ): Promise<UpdateSiteResponse> | Observable<UpdateSiteResponse> | UpdateSiteResponse;

  getSiteList(
    request: GetSiteListRequest,
  ): Promise<GetSiteListResponse> | Observable<GetSiteListResponse> | GetSiteListResponse;

  suspendSite(
    request: SuspendSiteRequest,
  ): Promise<SuspendSiteResponse> | Observable<SuspendSiteResponse> | SuspendSiteResponse;

  /**
   * -----------------------------
   * PAGE
   * -----------------------------
   */

  createPage(
    request: CreatePageRequest,
  ): Promise<CreatePageResponse> | Observable<CreatePageResponse> | CreatePageResponse;

  getPageList(
    request: GetPageListRequest,
  ): Promise<GetPageListResponse> | Observable<GetPageListResponse> | GetPageListResponse;

  getPage(request: GetPageRequest): Promise<GetPageResponse> | Observable<GetPageResponse> | GetPageResponse;

  updatePage(
    request: UpdatePageRequest,
  ): Promise<UpdatePageResponse> | Observable<UpdatePageResponse> | UpdatePageResponse;

  deletePage(
    request: DeletePageRequest,
  ): Promise<DeletePageResponse> | Observable<DeletePageResponse> | DeletePageResponse;

  archivePage(
    request: ArchivePageRequest,
  ): Promise<ArchivePageResponse> | Observable<ArchivePageResponse> | ArchivePageResponse;

  /**
   * -----------------------------
   * SECTION
   * -----------------------------
   */

  getPageSection(
    request: GetPageSectionRequest,
  ): Promise<GetPageSectionResponse> | Observable<GetPageSectionResponse> | GetPageSectionResponse;

  getPageSectionList(
    request: GetPageSectionListRequest,
  ): Promise<GetPageSectionListResponse> | Observable<GetPageSectionListResponse> | GetPageSectionListResponse;

  createSection(
    request: CreateSectionRequest,
  ): Promise<CreateSectionResponse> | Observable<CreateSectionResponse> | CreateSectionResponse;

  updateSectionIndex(
    request: UpdateSectionIndexRequest,
  ): Promise<UpdateSectionResponse> | Observable<UpdateSectionResponse> | UpdateSectionResponse;

  updateSectionFormat(
    request: UpdateSectionFormatRequest,
  ): Promise<UpdateSectionResponse> | Observable<UpdateSectionResponse> | UpdateSectionResponse;

  deleteSection(
    request: DeleteSectionRequest,
  ): Promise<DeleteSectionResponse> | Observable<DeleteSectionResponse> | DeleteSectionResponse;

  /**
   * -----------------------------
   * ELEMENTS
   * -----------------------------
   */

  deletePageElementList(
    request: DeletePageElementListRequest,
  ): Promise<DeletePageElementListResponse> | Observable<DeletePageElementListResponse> | DeletePageElementListResponse;

  deleteManyPageElements(
    request: DeleteManyPageElementsRequest,
  ):
    | Promise<DeleteManyPageElementsResponse>
    | Observable<DeleteManyPageElementsResponse>
    | DeleteManyPageElementsResponse;
}

export function SitesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createSite",
      "getSite",
      "updateSite",
      "getSiteList",
      "suspendSite",
      "createPage",
      "getPageList",
      "getPage",
      "updatePage",
      "deletePage",
      "archivePage",
      "getPageSection",
      "getPageSectionList",
      "createSection",
      "updateSectionIndex",
      "updateSectionFormat",
      "deleteSection",
      "deletePageElementList",
      "deleteManyPageElements",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("SitesService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("SitesService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const SITES_SERVICE_NAME = "SitesService";
