/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';

import { Observable } from 'rxjs';

export const protobufPackage = 'serv.sites';

/**
 * -----------------------------
 * ENUMS
 * -----------------------------
 */
export enum SiteStatus {
  DEPLOYED = 'DEPLOYED',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED',
}

export enum PageStatus {
  ACTIVE = 'ACTIVE',
  DRAFT = 'DRAFT',
  ARCHIVED = 'ARCHIVED',
  SCHEDULED = 'SCHEDULED',
}

export enum ElementType {
  meta = 'meta',
  style = 'style',
  link = 'link',
  title = 'title',
  address = 'address',
  article = 'article',
  aside = 'aside',
  footer = 'footer',
  header = 'header',
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
  main = 'main',
  nav = 'nav',
  section = 'section',
  blockquote = 'blockquote',
  dd = 'dd',
  div = 'div',
  dl = 'dl',
  dt = 'dt',
  figcaption = 'figcaption',
  figure = 'figure',
  hr = 'hr',
  li = 'li',
  menu = 'menu',
  ol = 'ol',
  p = 'p',
  pre = 'pre',
  ul = 'ul',
  a = 'a',
  abbr = 'abbr',
  b = 'b',
  bdi = 'bdi',
  bdo = 'bdo',
  br = 'br',
  cite = 'cite',
  code = 'code',
  data = 'data',
  dfn = 'dfn',
  em = 'em',
  i = 'i',
  kbd = 'kbd',
  mark = 'mark',
  q = 'q',
  rp = 'rp',
  rt = 'rt',
  ruby = 'ruby',
  s = 's',
  samp = 'samp',
  small = 'small',
  span = 'span',
  strong = 'strong',
  sub = 'sub',
  sup = 'sup',
  time = 'time',
  u = 'u',
  var = 'var',
  wbr = 'wbr',
  area = 'area',
  audio = 'audio',
  img = 'img',
  map = 'map',
  track = 'track',
  video = 'video',
  embed = 'embed',
  iframe = 'iframe',
  object = 'object',
  picture = 'picture',
  portal = 'portal',
  source = 'source',
  svg = 'svg',
  math = 'math',
  canvas = 'canvas',
  noscript = 'noscript',
  script = 'script',
}

export interface Component {
  id: string;
  ownBy: string;
  createdBy: string;
  updatedBy: string;
  name: string;
  iconUrl?: string | undefined;
  elements: Element[];
  createdAt?: Date;
  updatedAt?: Date;
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
  props?: { [key: string]: string | number };
}

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
  createdAt?: Date;
  updatedAt?: Date;
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
  requestedUserId: string;
  title?: string | undefined;
  description?: string | undefined;
  isLoneTitle?: boolean | undefined;
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

export interface ArchivePageRequest {
  organizationId: string;
  siteId: string;
  requestedUserId: string;
}

export interface ArchivePageResponse {
  page?: Page;
}

export interface CreateSiteRequest {
  name: string;
  owner: string;
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
  organizationId: string;
  siteId: string;
  name?: string | undefined;
}

export interface UpdateSiteResponse {
  site?: Site;
}

export interface GetSiteRequest {
  siteId: string;
  orgId?: string | undefined;
}

export interface GetSiteResponse {
  site?: Site;
}

export interface GetSiteListRequest {
  query?: { $case: 'ownBy'; ownBy: string };
}

export interface GetSiteListResponse {
  sites: Site[];
}

export interface SuspendSiteRequest {
  requestedUserId: string;
  organizationId: string;
  siteId: string;
}

export interface SuspendSiteResponse {
  site?: Site;
}

export const SERV_SITES_PACKAGE_NAME = 'serv.sites';

export interface SitesServiceClient {
  createSite(request: CreateSiteRequest): Observable<CreateSiteResponse>;

  getSite(request: GetSiteRequest): Observable<GetSiteResponse>;

  updateSite(request: UpdateSiteRequest): Observable<UpdateSiteResponse>;

  getSiteList(request: GetSiteListRequest): Observable<GetSiteListResponse>;

  createPage(request: CreatePageRequest): Observable<CreatePageResponse>;

  suspendSite(request: SuspendSiteRequest): Observable<SuspendSiteResponse>;

  getPageList(request: GetPageListRequest): Observable<GetPageListResponse>;

  getPage(request: GetPageRequest): Observable<GetPageResponse>;

  updatePage(request: UpdatePageRequest): Observable<UpdatePageResponse>;

  deletePage(request: DeletePageRequest): Observable<DeletePageResponse>;

  archivePage(request: ArchivePageRequest): Observable<ArchivePageResponse>;
}

export interface SitesServiceController {
  createSite(
    request: CreateSiteRequest,
  ):
    | Promise<CreateSiteResponse>
    | Observable<CreateSiteResponse>
    | CreateSiteResponse;

  getSite(
    request: GetSiteRequest,
  ): Promise<GetSiteResponse> | Observable<GetSiteResponse> | GetSiteResponse;

  updateSite(
    request: UpdateSiteRequest,
  ):
    | Promise<UpdateSiteResponse>
    | Observable<UpdateSiteResponse>
    | UpdateSiteResponse;

  getSiteList(
    request: GetSiteListRequest,
  ):
    | Promise<GetSiteListResponse>
    | Observable<GetSiteListResponse>
    | GetSiteListResponse;

  createPage(
    request: CreatePageRequest,
  ):
    | Promise<CreatePageResponse>
    | Observable<CreatePageResponse>
    | CreatePageResponse;

  suspendSite(
    request: SuspendSiteRequest,
  ):
    | Promise<SuspendSiteResponse>
    | Observable<SuspendSiteResponse>
    | SuspendSiteResponse;

  getPageList(
    request: GetPageListRequest,
  ):
    | Promise<GetPageListResponse>
    | Observable<GetPageListResponse>
    | GetPageListResponse;

  getPage(
    request: GetPageRequest,
  ): Promise<GetPageResponse> | Observable<GetPageResponse> | GetPageResponse;

  updatePage(
    request: UpdatePageRequest,
  ):
    | Promise<UpdatePageResponse>
    | Observable<UpdatePageResponse>
    | UpdatePageResponse;

  deletePage(
    request: DeletePageRequest,
  ):
    | Promise<DeletePageResponse>
    | Observable<DeletePageResponse>
    | DeletePageResponse;

  archivePage(
    request: ArchivePageRequest,
  ):
    | Promise<ArchivePageResponse>
    | Observable<ArchivePageResponse>
    | ArchivePageResponse;
}

export function SitesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createSite',
      'getSite',
      'updateSite',
      'getSiteList',
      'createPage',
      'suspendSite',
      'getPageList',
      'getPage',
      'updatePage',
      'deletePage',
      'archivePage',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('SitesService', method)(
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
      GrpcStreamMethod('SitesService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const SITES_SERVICE_NAME = 'SitesService';
