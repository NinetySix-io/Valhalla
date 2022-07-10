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

export enum ElementType {
  meta = "meta",
  style = "style",
  link = "link",
  title = "title",
  address = "address",
  article = "article",
  aside = "aside",
  footer = "footer",
  header = "header",
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
  main = "main",
  nav = "nav",
  section = "section",
  blockquote = "blockquote",
  dd = "dd",
  div = "div",
  dl = "dl",
  dt = "dt",
  figcaption = "figcaption",
  figure = "figure",
  hr = "hr",
  li = "li",
  menu = "menu",
  ol = "ol",
  p = "p",
  pre = "pre",
  ul = "ul",
  a = "a",
  abbr = "abbr",
  b = "b",
  bdi = "bdi",
  bdo = "bdo",
  br = "br",
  cite = "cite",
  code = "code",
  data = "data",
  dfn = "dfn",
  em = "em",
  i = "i",
  kbd = "kbd",
  mark = "mark",
  q = "q",
  rp = "rp",
  rt = "rt",
  ruby = "ruby",
  s = "s",
  samp = "samp",
  small = "small",
  span = "span",
  strong = "strong",
  sub = "sub",
  sup = "sup",
  time = "time",
  u = "u",
  var = "var",
  wbr = "wbr",
  area = "area",
  audio = "audio",
  img = "img",
  map = "map",
  track = "track",
  video = "video",
  embed = "embed",
  iframe = "iframe",
  object = "object",
  picture = "picture",
  portal = "portal",
  source = "source",
  svg = "svg",
  math = "math",
  canvas = "canvas",
  noscript = "noscript",
  script = "script",
}

export interface Component {
  id: string;
  owners: string[];
  createdBy: string;
  updatedBy: string;
  name: string;
  thumbnailUrl?: string | undefined;
  createdAt?: Date;
  updatedAt?: Date;
  status: EditStatus;
  isHidden?: boolean | undefined;
}

export interface ElementStyle {
  updatedAt?: Date;
}

export interface Element {
  type: ElementType;
  id?: string | undefined;
  className?: string | undefined;
  children: Element[];
  updatedAt?: Date;
  updatedBy?: Date;
  style?: ElementStyle | undefined;
  props?: { [key: string]: any };
}

export interface Page {
  id: string;
  title: string;
  description?: string | undefined;
  ownBy: string;
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
  ownBy: string;
  status: SiteStatus;
  url?: string | undefined;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GetComponentElementListRequest {
  ownerIdList: string[];
  componentId: string;
}

export interface GetComponentElementListResponse {
  elements: Element[];
}

export interface CreateComponentRequest {
  ownerIdList: string[];
  requestedUserId: string;
  name: string;
  elements: Element[];
  status?: EditStatus | undefined;
  isHidden?: boolean | undefined;
}

export interface CreateComponentResponse {
  componentId: string;
}

export interface UpdateComponentRequest {
  ownerIdList: string[];
  requestedUserId: string;
  componentId: string;
  name?: string | undefined;
  elements: Element[];
  status?: EditStatus | undefined;
}

export interface UpdateComponentResponse {}

export interface DeleteComponentRequest {
  ownerIdList: string[];
  componentId: string;
  requestedUserId: string;
}

export interface DeleteComponentResponse {}

export interface ArchiveComponentRequest {
  ownerIdList: string[];
  componentId: string;
  requestedUserId: string;
}

export interface ArchiveComponentResponse {}

export interface GetComponentRequest {
  ownerIdList: string[];
  componentId: string;
}

export interface GetComponentResponse {
  component?: Component;
}

export interface GetComponentListRequest {
  ownerIdList: string[];
}

export interface GetComponentListResponse {
  result: Component[];
}

/**
 * -----------------------------
 * PAGE
 * -----------------------------
 */
export interface CreatePageRequest {
  requestedUserId: string;
  ownerId: string;
  siteId: string;
  title?: string | undefined;
}

export interface CreatePageResponse {
  page?: Page;
}

export interface GetOrCreateFirstPageRequest {
  requestedUserId: string;
  ownerId: string;
  siteId: string;
  fallbackTitle?: string | undefined;
}

export interface GetOrCreateFirstPageResponse {
  page?: Page;
}

export interface GetPageRequest {
  ownerId: string;
  siteId: string;
  pageId: string;
}

export interface GetPageResponse {
  page?: Page | undefined;
}

export interface GetPageListRequest {
  ownerId: string;
  siteId: string;
}

export interface GetPageListResponse {
  pageList: Page[];
}

export interface UpdatePageRequest {
  ownerId: string;
  siteId: string;
  pageId: string;
  requestedUserId: string;
  title?: string | undefined;
  description?: string | undefined;
  isLoneTitle?: boolean | undefined;
}

export interface UpdatePageResponse {
  page?: Page;
}

export interface DeletePageRequest {
  ownerId: string;
  siteId: string;
  requestedUserId: string;
  pageId: string;
}

export interface DeletePageResponse {
  page?: Page;
}

export interface ArchivePageRequest {
  ownerId: string;
  siteId: string;
  requestedUserId: string;
}

export interface ArchivePageResponse {
  page?: Page;
}

export interface CreateSiteRequest {
  name: string;
  ownerId: string;
  requestedUserId: string;
  logoUrl?: string | undefined;
  faviconUrl?: string | undefined;
}

export interface CreateSiteResponse {
  siteId: string;
  status: SiteStatus;
}

export interface UpdateSiteRequest {
  requestedUserId: string;
  ownerId: string;
  siteId: string;
  name?: string | undefined;
}

export interface UpdateSiteResponse {
  site?: Site;
}

export interface GetSiteRequest {
  siteId: string;
  ownerId?: string | undefined;
}

export interface GetSiteResponse {
  site?: Site;
}

export interface GetSiteListRequest {
  query?: { $case: "ownerId"; ownerId: string };
}

export interface GetSiteListResponse {
  sites: Site[];
}

export interface SuspendSiteRequest {
  requestedUserId: string;
  ownerId: string;
  siteId: string;
}

export interface SuspendSiteResponse {
  site?: Site;
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

  getOrCreateFirstPage(
    request: GetOrCreateFirstPageRequest
  ): Observable<GetOrCreateFirstPageResponse>;

  updatePage(request: UpdatePageRequest): Observable<UpdatePageResponse>;

  deletePage(request: DeletePageRequest): Observable<DeletePageResponse>;

  archivePage(request: ArchivePageRequest): Observable<ArchivePageResponse>;

  /**
   * -----------------------------
   * COMPONENT
   * -----------------------------
   */

  getComponentElementList(
    request: GetComponentElementListRequest
  ): Observable<GetComponentElementListResponse>;

  getComponent(request: GetComponentRequest): Observable<GetComponentResponse>;

  getComponentList(
    request: GetComponentListRequest
  ): Observable<GetComponentListResponse>;

  createComponent(
    request: CreateComponentRequest
  ): Observable<CreateComponentResponse>;

  updateComponent(
    request: UpdateComponentRequest
  ): Observable<UpdateComponentResponse>;

  deleteComponent(
    request: DeleteComponentRequest
  ): Observable<DeleteComponentResponse>;

  archiveComponent(
    request: ArchiveComponentRequest
  ): Observable<ArchiveComponentResponse>;
}

export interface SitesServiceController {
  /**
   * -----------------------------
   * SITE
   * -----------------------------
   */

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

  suspendSite(
    request: SuspendSiteRequest
  ):
    | Promise<SuspendSiteResponse>
    | Observable<SuspendSiteResponse>
    | SuspendSiteResponse;

  /**
   * -----------------------------
   * PAGE
   * -----------------------------
   */

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

  getOrCreateFirstPage(
    request: GetOrCreateFirstPageRequest
  ):
    | Promise<GetOrCreateFirstPageResponse>
    | Observable<GetOrCreateFirstPageResponse>
    | GetOrCreateFirstPageResponse;

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

  archivePage(
    request: ArchivePageRequest
  ):
    | Promise<ArchivePageResponse>
    | Observable<ArchivePageResponse>
    | ArchivePageResponse;

  /**
   * -----------------------------
   * COMPONENT
   * -----------------------------
   */

  getComponentElementList(
    request: GetComponentElementListRequest
  ):
    | Promise<GetComponentElementListResponse>
    | Observable<GetComponentElementListResponse>
    | GetComponentElementListResponse;

  getComponent(
    request: GetComponentRequest
  ):
    | Promise<GetComponentResponse>
    | Observable<GetComponentResponse>
    | GetComponentResponse;

  getComponentList(
    request: GetComponentListRequest
  ):
    | Promise<GetComponentListResponse>
    | Observable<GetComponentListResponse>
    | GetComponentListResponse;

  createComponent(
    request: CreateComponentRequest
  ):
    | Promise<CreateComponentResponse>
    | Observable<CreateComponentResponse>
    | CreateComponentResponse;

  updateComponent(
    request: UpdateComponentRequest
  ):
    | Promise<UpdateComponentResponse>
    | Observable<UpdateComponentResponse>
    | UpdateComponentResponse;

  deleteComponent(
    request: DeleteComponentRequest
  ):
    | Promise<DeleteComponentResponse>
    | Observable<DeleteComponentResponse>
    | DeleteComponentResponse;

  archiveComponent(
    request: ArchiveComponentRequest
  ):
    | Promise<ArchiveComponentResponse>
    | Observable<ArchiveComponentResponse>
    | ArchiveComponentResponse;
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
      "getOrCreateFirstPage",
      "updatePage",
      "deletePage",
      "archivePage",
      "getComponentElementList",
      "getComponent",
      "getComponentList",
      "createComponent",
      "updateComponent",
      "deleteComponent",
      "archiveComponent",
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
