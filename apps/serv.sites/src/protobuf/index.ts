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
  TEXT = "TEXT",
  BUTTON = "BUTTON",
  CONTAINER = "CONTAINER",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  SELECT = "SELECT",
  LINK = "LINK",
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

export interface TextElement {
  id: string;
  parent: string;
  owners: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ButtonElement {
  id: string;
  parent: string;
  owners: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContainerElement {
  id: string;
  parent: string;
  owners: string[];
  isRoot?: boolean | undefined;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LinkElement {
  id: string;
  parent: string;
  owners: string[];
  url: string;
  isNewTab: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ImageElement {
  id: string;
  parent: string;
  resource: string;
  owners: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VideoElement {
  id: string;
  parent: string;
  resource: string;
  owners: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SelectElement {
  id: string;
  parent: string;
  resource: string;
  owners: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Element {
  element?:
    | { $case: "Text"; Text: TextElement }
    | { $case: "Button"; Button: ButtonElement }
    | { $case: "Container"; Container: ContainerElement }
    | { $case: "Link"; Link: LinkElement }
    | { $case: "Image"; Image: ImageElement }
    | { $case: "Video"; Video: VideoElement };
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

export interface CreateButtonRequest {}

export interface UpdateButtonRequest {}

export interface CreateTextRequest {}

export interface UpdateTextRequest {}

export interface CreateContainerRequest {}

export interface UpdateContainerRequest {}

export interface CreateImageRequest {}

export interface UpdateImageRequest {}

export interface CreateLinkRequest {}

export interface UpdateLinkRequest {}

export interface CreateVideoRequest {}

export interface UpdateVideoRequest {}

export interface CreateSelectRequest {}

export interface UpdateSelectRequest {}

export interface DeleteManyElementsRequest {
  requestedUserId: string;
  elementIdList: string[];
  owners: string[];
}

export interface DeleteManyElementsResponse {}

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

  deleteElement(
    request: DeleteElementRequest
  ): Observable<DeleteElementResponse>;

  deleteManyElements(
    request: DeleteManyElementsRequest
  ): Observable<DeleteManyElementsResponse>;

  createButton(request: CreateButtonRequest): Observable<ButtonElement>;

  updateButton(request: UpdateButtonRequest): Observable<ButtonElement>;

  createText(request: CreateTextRequest): Observable<TextElement>;

  updateTExt(request: UpdateTextRequest): Observable<TextElement>;

  createContainer(
    request: CreateContainerRequest
  ): Observable<ContainerElement>;

  updateContainer(
    request: UpdateContainerRequest
  ): Observable<ContainerElement>;

  createImage(request: CreateImageRequest): Observable<ImageElement>;

  updateImage(request: UpdateImageRequest): Observable<ImageElement>;

  createVideo(request: CreateVideoRequest): Observable<VideoElement>;

  updateVideo(request: UpdateVideoRequest): Observable<VideoElement>;

  createSelect(request: CreateSelectRequest): Observable<SelectElement>;

  updateSelect(request: UpdateSelectRequest): Observable<SelectElement>;

  createLink(request: CreateLinkRequest): Observable<LinkElement>;

  updateLink(request: UpdateLinkRequest): Observable<LinkElement>;
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

  createButton(
    request: CreateButtonRequest
  ): Promise<ButtonElement> | Observable<ButtonElement> | ButtonElement;

  updateButton(
    request: UpdateButtonRequest
  ): Promise<ButtonElement> | Observable<ButtonElement> | ButtonElement;

  createText(
    request: CreateTextRequest
  ): Promise<TextElement> | Observable<TextElement> | TextElement;

  updateTExt(
    request: UpdateTextRequest
  ): Promise<TextElement> | Observable<TextElement> | TextElement;

  createContainer(
    request: CreateContainerRequest
  ):
    | Promise<ContainerElement>
    | Observable<ContainerElement>
    | ContainerElement;

  updateContainer(
    request: UpdateContainerRequest
  ):
    | Promise<ContainerElement>
    | Observable<ContainerElement>
    | ContainerElement;

  createImage(
    request: CreateImageRequest
  ): Promise<ImageElement> | Observable<ImageElement> | ImageElement;

  updateImage(
    request: UpdateImageRequest
  ): Promise<ImageElement> | Observable<ImageElement> | ImageElement;

  createVideo(
    request: CreateVideoRequest
  ): Promise<VideoElement> | Observable<VideoElement> | VideoElement;

  updateVideo(
    request: UpdateVideoRequest
  ): Promise<VideoElement> | Observable<VideoElement> | VideoElement;

  createSelect(
    request: CreateSelectRequest
  ): Promise<SelectElement> | Observable<SelectElement> | SelectElement;

  updateSelect(
    request: UpdateSelectRequest
  ): Promise<SelectElement> | Observable<SelectElement> | SelectElement;

  createLink(
    request: CreateLinkRequest
  ): Promise<LinkElement> | Observable<LinkElement> | LinkElement;

  updateLink(
    request: UpdateLinkRequest
  ): Promise<LinkElement> | Observable<LinkElement> | LinkElement;
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
      "deleteElement",
      "deleteManyElements",
      "createButton",
      "updateButton",
      "createText",
      "updateTExt",
      "createContainer",
      "updateContainer",
      "createImage",
      "updateImage",
      "createVideo",
      "updateVideo",
      "createSelect",
      "updateSelect",
      "createLink",
      "updateLink",
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
