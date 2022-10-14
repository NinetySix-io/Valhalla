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

export enum PrimitiveElementType {
  TEXT = "TEXT",
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
  rowsCount: number;
  columnGap: number;
  rowGap: number;
}

export interface PageSection {
  id: string;
  format?: SectionFormat;
  updatedBy: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PageElementArea {
  x: number;
  y: number;
  height: number;
  width: number;
  isVisible: boolean;
}

export interface TextElement {
  html: string;
  json?: { [key: string]: any };
}

export interface PageElement {
  id: string;
  updatedBy: string;
  createdBy: string;
  group: string;
  desktop?: PageElementArea;
  tablet?: PageElementArea | undefined;
  mobile?: PageElementArea | undefined;
  createdAt?: Date;
  updatedAt?: Date;
  type?: { $case: "text"; text: TextElement };
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
  format?: SectionFormat | undefined;
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
  rowsCount?: number | undefined;
  columnGap?: number | undefined;
  rowGap?: number | undefined;
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

export interface CloneSectionRequest {
  pageId: string;
  sectionId: string;
  requestedUserId: string;
}

export interface CloneSectionResponse {
  data?: PageSection;
}

export interface GetPageElementListByGroupRequest {
  groupId: string;
}

export interface GetPageElementListByGroupResponse {
  data: PageElement[];
}

export interface DeletePageElementListByGroupRequest {
  groupId: string;
  requestedUserId: string;
}

export interface DeletePageElementListByGroupResponse {
  data: PageElement[];
}

export interface DeleteManyPageElementsRequest {
  elementIdList: string[];
  requestedUserId: string;
}

export interface DeleteManyPageElementsResponse {
  data: PageElement[];
}

export interface AddPageElementRequest {
  requestedUserId: string;
  groupId: string;
  desktop?: PageElementArea;
  tablet?: PageElementArea | undefined;
  mobile?: PageElementArea | undefined;
  type?: { $case: "text"; text: TextElement };
}

export interface AddPageElementResponse {
  data?: PageElement;
}

export interface DeletePageElementRequest {
  requestedUserId: string;
  elementId: string;
}

export interface DeletePageElementResponse {
  data?: PageElement;
}

export interface UpdatePageElementRequest {
  requestedUserId: string;
  elementId: string;
  desktop?: PageElementArea | undefined;
  tablet?: PageElementArea | undefined;
  mobile?: PageElementArea | undefined;
  type?: { $case: "text"; text: TextElement };
}

export interface UpdatePageElementResponse {
  data?: PageElement;
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

  cloneSection(request: CloneSectionRequest): Observable<CloneSectionResponse>;

  /**
   * -----------------------------
   * ELEMENTS
   * -----------------------------
   */

  getPageElementListByGroup(request: GetPageElementListByGroupRequest): Observable<GetPageElementListByGroupResponse>;

  deletePageElementListByGroup(
    request: DeletePageElementListByGroupRequest,
  ): Observable<DeletePageElementListByGroupResponse>;

  deleteManyPageElements(request: DeleteManyPageElementsRequest): Observable<DeleteManyPageElementsResponse>;

  addPageElement(request: AddPageElementRequest): Observable<AddPageElementResponse>;

  deletePageElement(request: DeletePageElementRequest): Observable<DeletePageElementResponse>;

  updatePageElement(request: UpdatePageElementRequest): Observable<UpdatePageElementResponse>;
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

  cloneSection(
    request: CloneSectionRequest,
  ): Promise<CloneSectionResponse> | Observable<CloneSectionResponse> | CloneSectionResponse;

  /**
   * -----------------------------
   * ELEMENTS
   * -----------------------------
   */

  getPageElementListByGroup(
    request: GetPageElementListByGroupRequest,
  ):
    | Promise<GetPageElementListByGroupResponse>
    | Observable<GetPageElementListByGroupResponse>
    | GetPageElementListByGroupResponse;

  deletePageElementListByGroup(
    request: DeletePageElementListByGroupRequest,
  ):
    | Promise<DeletePageElementListByGroupResponse>
    | Observable<DeletePageElementListByGroupResponse>
    | DeletePageElementListByGroupResponse;

  deleteManyPageElements(
    request: DeleteManyPageElementsRequest,
  ):
    | Promise<DeleteManyPageElementsResponse>
    | Observable<DeleteManyPageElementsResponse>
    | DeleteManyPageElementsResponse;

  addPageElement(
    request: AddPageElementRequest,
  ): Promise<AddPageElementResponse> | Observable<AddPageElementResponse> | AddPageElementResponse;

  deletePageElement(
    request: DeletePageElementRequest,
  ): Promise<DeletePageElementResponse> | Observable<DeletePageElementResponse> | DeletePageElementResponse;

  updatePageElement(
    request: UpdatePageElementRequest,
  ): Promise<UpdatePageElementResponse> | Observable<UpdatePageElementResponse> | UpdatePageElementResponse;
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
      "cloneSection",
      "getPageElementListByGroup",
      "deletePageElementListByGroup",
      "deleteManyPageElements",
      "addPageElement",
      "deletePageElement",
      "updatePageElement",
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
