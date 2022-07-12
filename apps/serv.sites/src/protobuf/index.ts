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
  name: string;
  ownBy: string;
  updatedBy: string;
  createdBy: string;
  thumbnailUrl: string;
  status: EditStatus;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface Element {
  id: string;
  owners: string[];
  parent: string;
  updatedBy: string;
  type: ElementType;
  isRoot?: boolean | undefined;
  props?: { [key: string]: any };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface HierarchicalElement {
  id: string;
  type: ElementType;
  props?: { [key: string]: any };
  children: HierarchicalElement[];
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

export interface CreateManyElementsRequest {
  elements: CreateElementRequest[];
}

export interface CreateManyElementsResponse {}

export interface CreateElementsFromComponentRequest {
  componentId: string;
  parent: string;
  owners: string[];
  requestedUserId: string;
  componentOwnerId: string;
}

export interface CreateElementsFromComponentResponse {}

export interface DeleteManyElementsRequest {
  requestedUserId: string;
  elementIdList: string[];
  owners: string[];
}

export interface DeleteManyElementsResponse {}

export interface CreateElementRequest {
  parent: string;
  requestedUserId: string;
  owners: string[];
  type: ElementType;
  isRoot?: boolean | undefined;
  props?: { [key: string]: any };
}

export interface CreateElementResponse {
  element?: Element;
}

export interface UpdateElementRequest {
  elementId: string;
  requestedUserId: string;
  owners: string[];
  type?: string | undefined;
  parent?: string | undefined;
  props?: { [key: string]: any };
}

export interface UpdateElementResponse {
  element?: Element;
}

export interface DeleteElementRequest {
  elementId: string;
  requestedUserId: string;
  owners: string[];
}

export interface DeleteElementResponse {
  element?: Element;
}

export interface GetElementFlatListRequest {
  owners: string[];
}

export interface GetElementFlatListResponse {
  elements: Element[];
}

export interface GetElementHierarchicalListRequest {
  owners: string[];
}

export interface GetElementHierarchicalListResponse {
  elements: HierarchicalElement[];
}

export interface CloneComponentRequest {
  componentId: string;
  requestedUserId: string;
  ownerId: string;
  name?: string | undefined;
  status?: EditStatus | undefined;
}

export interface CloneComponentResponse {
  componentId: string;
}

export interface CreateComponentRequest {
  requestedUserId: string;
  ownerId: string;
  name: string;
  status?: EditStatus | undefined;
}

export interface CreateComponentResponse {
  component?: Component;
}

export interface UpdateComponentRequest {
  ownerId: string;
  componentId: string;
  requestedUserId: string;
  name?: string | undefined;
  status?: EditStatus | undefined;
}

export interface UpdateComponentResponse {
  component?: Component;
}

export interface DeleteComponentRequest {
  ownerId: string;
  componentId: string;
  requestedUserId: string;
}

export interface DeleteComponentResponse {
  component?: Component;
}

export interface ArchiveComponentRequest {
  ownerId: string;
  componentId: string;
  requestedUserId: string;
}

export interface ArchiveComponentResponse {
  component?: Component;
}

export interface GetComponentRequest {
  ownerId: string;
  componentId: string;
}

export interface GetComponentResponse {
  component?: Component;
}

export interface GetComponentListRequest {
  ownerId: string;
}

export interface GetComponentListResponse {
  componentList: Component[];
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

  getComponent(request: GetComponentRequest): Observable<GetComponentResponse>;

  getComponentList(
    request: GetComponentListRequest
  ): Observable<GetComponentListResponse>;

  createComponent(
    request: CreateComponentRequest
  ): Observable<CreateComponentResponse>;

  cloneComponent(
    request: CloneComponentRequest
  ): Observable<CloneComponentResponse>;

  updateComponent(
    request: UpdateComponentRequest
  ): Observable<UpdateComponentResponse>;

  deleteComponent(
    request: DeleteComponentRequest
  ): Observable<DeleteComponentResponse>;

  archiveComponent(
    request: ArchiveComponentRequest
  ): Observable<ArchiveComponentResponse>;

  /**
   * -----------------------------
   * Elements
   * -----------------------------
   */

  getElementFlatList(
    request: GetElementFlatListRequest
  ): Observable<GetElementFlatListResponse>;

  getElementHierarchicalList(
    request: GetElementHierarchicalListRequest
  ): Observable<GetElementHierarchicalListResponse>;

  createElement(
    request: CreateElementRequest
  ): Observable<CreateElementResponse>;

  createManyElements(
    request: CreateManyElementsRequest
  ): Observable<CreateManyElementsResponse>;

  createElementsFromComponent(
    request: CreateElementsFromComponentRequest
  ): Observable<CreateElementsFromComponentResponse>;

  updateElement(
    request: UpdateElementRequest
  ): Observable<UpdateElementResponse>;

  deleteElement(
    request: DeleteElementRequest
  ): Observable<DeleteElementResponse>;

  deleteManyElements(
    request: DeleteManyElementsRequest
  ): Observable<DeleteManyElementsResponse>;
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

  cloneComponent(
    request: CloneComponentRequest
  ):
    | Promise<CloneComponentResponse>
    | Observable<CloneComponentResponse>
    | CloneComponentResponse;

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

  /**
   * -----------------------------
   * Elements
   * -----------------------------
   */

  getElementFlatList(
    request: GetElementFlatListRequest
  ):
    | Promise<GetElementFlatListResponse>
    | Observable<GetElementFlatListResponse>
    | GetElementFlatListResponse;

  getElementHierarchicalList(
    request: GetElementHierarchicalListRequest
  ):
    | Promise<GetElementHierarchicalListResponse>
    | Observable<GetElementHierarchicalListResponse>
    | GetElementHierarchicalListResponse;

  createElement(
    request: CreateElementRequest
  ):
    | Promise<CreateElementResponse>
    | Observable<CreateElementResponse>
    | CreateElementResponse;

  createManyElements(
    request: CreateManyElementsRequest
  ):
    | Promise<CreateManyElementsResponse>
    | Observable<CreateManyElementsResponse>
    | CreateManyElementsResponse;

  createElementsFromComponent(
    request: CreateElementsFromComponentRequest
  ):
    | Promise<CreateElementsFromComponentResponse>
    | Observable<CreateElementsFromComponentResponse>
    | CreateElementsFromComponentResponse;

  updateElement(
    request: UpdateElementRequest
  ):
    | Promise<UpdateElementResponse>
    | Observable<UpdateElementResponse>
    | UpdateElementResponse;

  deleteElement(
    request: DeleteElementRequest
  ):
    | Promise<DeleteElementResponse>
    | Observable<DeleteElementResponse>
    | DeleteElementResponse;

  deleteManyElements(
    request: DeleteManyElementsRequest
  ):
    | Promise<DeleteManyElementsResponse>
    | Observable<DeleteManyElementsResponse>
    | DeleteManyElementsResponse;
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
      "getComponent",
      "getComponentList",
      "createComponent",
      "cloneComponent",
      "updateComponent",
      "deleteComponent",
      "archiveComponent",
      "getElementFlatList",
      "getElementHierarchicalList",
      "createElement",
      "createManyElements",
      "createElementsFromComponent",
      "updateElement",
      "deleteElement",
      "deleteManyElements",
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
