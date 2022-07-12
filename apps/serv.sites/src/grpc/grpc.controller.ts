import {
  ArchiveComponentRequest,
  ArchiveComponentResponse,
  ArchivePageRequest,
  ArchivePageResponse,
  CloneComponentRequest,
  CloneComponentResponse,
  CreateComponentRequest,
  CreateComponentResponse,
  CreateElementRequest,
  CreateElementResponse,
  CreateElementsFromComponentRequest,
  CreateElementsFromComponentResponse,
  CreateManyElementsRequest,
  CreateManyElementsResponse,
  CreatePageRequest,
  CreatePageResponse,
  CreateSiteRequest,
  CreateSiteResponse,
  DeleteComponentRequest,
  DeleteComponentResponse,
  DeleteElementRequest,
  DeleteElementResponse,
  DeleteManyElementsRequest,
  DeleteManyElementsResponse,
  DeletePageRequest,
  DeletePageResponse,
  GetComponentListRequest,
  GetComponentListResponse,
  GetComponentRequest,
  GetComponentResponse,
  GetElementFlatListRequest,
  GetElementFlatListResponse,
  GetElementHierarchicalListRequest,
  GetElementHierarchicalListResponse,
  GetOrCreateFirstPageRequest,
  GetPageListRequest,
  GetPageListResponse,
  GetPageRequest,
  GetPageResponse,
  GetSiteListRequest,
  GetSiteListResponse,
  GetSiteRequest,
  GetSiteResponse,
  SITES_SERVICE_NAME,
  SitesServiceController,
  SuspendSiteRequest,
  SuspendSiteResponse,
  UpdateComponentRequest,
  UpdateComponentResponse,
  UpdateElementRequest,
  UpdateElementResponse,
  UpdatePageRequest,
  UpdatePageResponse,
  UpdateSiteRequest,
  UpdateSiteResponse,
} from '@app/protobuf';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ArchiveComponentCommand } from '@app/cqrs/commands/archive.component.command';
import { ArchivePageCommand } from '@app/cqrs/commands/archive.page.command';
import { CloneComponentCommand } from '@app/cqrs/commands/clone.component.command';
import { Controller } from '@nestjs/common';
import { CreateComponentCommand } from '@app/cqrs/commands/create.component.command';
import { CreateElementCommand } from '@app/cqrs/commands/create.element.command';
import { CreateElementsFromComponentCommand } from '@app/cqrs/commands/create.elements.from.component.command';
import { CreateManyElementsCommand } from '@app/cqrs/commands/create.many.elements.command';
import { CreatePageCommand } from '@app/cqrs/commands/create.page.command';
import { CreateSiteCommand } from '@app/cqrs/commands/create.site.command';
import { DeleteComponentCommand } from '@app/cqrs/commands/delete.component.command';
import { DeleteElementCommand } from '@app/cqrs/commands/delete.element.command';
import { DeleteManyElementsCommand } from '@app/cqrs/commands/delete.many.elements.command';
import { DeletePageCommand } from '@app/cqrs/commands/delete.page.command';
import { GetComponentListQuery } from '@app/cqrs/queries/get.component.list.query';
import { GetComponentQuery } from '@app/cqrs/queries/get.component.query';
import { GetElementFlatListQuery } from '@app/cqrs/queries/get.element.flat.list.query';
import { GetElementHierarchicalListQuery } from '@app/cqrs/queries/get.element.hierachical.list.query';
import { GetOrCreateFirstPageCommand } from '@app/cqrs/commands/get.or.create.first.page.command';
import { GetPageListQuery } from '@app/cqrs/queries/get.page.list.query';
import { GetPageQuery } from '@app/cqrs/queries/get.page.query';
import { GetSiteListQuery } from '@app/cqrs/queries/get.site.list.query';
import { GetSiteQuery } from '@app/cqrs/queries/get.site.query';
import { GrpcClass } from '@valhalla/serv.core';
import { Observable } from 'rxjs';
import { SuspendSiteCommand } from '@app/cqrs/commands/suspend.site.command';
import { UpdateComponentCommand } from '@app/cqrs/commands/update.component.command';
import { UpdateElementCommand } from '@app/cqrs/commands/update.element.command';
import { UpdatePageCommand } from '@app/cqrs/commands/update.page.command';
import { UpdateSiteCommand } from '@app/cqrs/commands/update.site.command';

@Controller()
@GrpcClass(SITES_SERVICE_NAME)
export class gRpcController implements SitesServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  createManyElements(
    request: CreateManyElementsRequest,
  ):
    | CreateManyElementsResponse
    | Promise<CreateManyElementsResponse>
    | Observable<CreateManyElementsResponse> {
    return this.commandBus.execute(new CreateManyElementsCommand(request));
  }
  cloneComponent(
    request: CloneComponentRequest,
  ):
    | CloneComponentResponse
    | Promise<CloneComponentResponse>
    | Observable<CloneComponentResponse> {
    return this.commandBus.execute(new CloneComponentCommand(request));
  }
  createElementsFromComponent(
    request: CreateElementsFromComponentRequest,
  ):
    | CreateElementsFromComponentResponse
    | Promise<CreateElementsFromComponentResponse>
    | Observable<CreateElementsFromComponentResponse> {
    return this.commandBus.execute(
      new CreateElementsFromComponentCommand(request),
    );
  }
  deleteManyElements(
    request: DeleteManyElementsRequest,
  ):
    | DeleteManyElementsResponse
    | Promise<DeleteManyElementsResponse>
    | Observable<DeleteManyElementsResponse> {
    return this.commandBus.execute(new DeleteManyElementsCommand(request));
  }
  getElementFlatList(
    request: GetElementFlatListRequest,
  ):
    | GetElementFlatListResponse
    | Promise<GetElementFlatListResponse>
    | Observable<GetElementFlatListResponse> {
    return this.queryBus.execute(new GetElementFlatListQuery(request));
  }
  getElementHierarchicalList(
    request: GetElementHierarchicalListRequest,
  ):
    | GetElementHierarchicalListResponse
    | Promise<GetElementHierarchicalListResponse>
    | Observable<GetElementHierarchicalListResponse> {
    return this.queryBus.execute(new GetElementHierarchicalListQuery(request));
  }
  createElement(
    request: CreateElementRequest,
  ):
    | CreateElementResponse
    | Promise<CreateElementResponse>
    | Observable<CreateElementResponse> {
    return this.commandBus.execute(new CreateElementCommand(request));
  }
  updateElement(
    request: UpdateElementRequest,
  ):
    | UpdateElementResponse
    | Promise<UpdateElementResponse>
    | Observable<UpdateElementResponse> {
    return this.commandBus.execute(new UpdateElementCommand(request));
  }
  deleteElement(
    request: DeleteElementRequest,
  ):
    | DeleteElementResponse
    | Promise<DeleteElementResponse>
    | Observable<DeleteElementResponse> {
    return this.commandBus.execute(new DeleteElementCommand(request));
  }
  updateComponent(
    request: UpdateComponentRequest,
  ):
    | UpdateComponentResponse
    | Promise<UpdateComponentResponse>
    | Observable<UpdateComponentResponse> {
    return this.commandBus.execute(new UpdateComponentCommand(request));
  }
  deleteComponent(
    request: DeleteComponentRequest,
  ):
    | DeleteComponentResponse
    | Promise<DeleteComponentResponse>
    | Observable<DeleteComponentResponse> {
    return this.commandBus.execute(new DeleteComponentCommand(request));
  }
  archiveComponent(
    request: ArchiveComponentRequest,
  ):
    | ArchiveComponentResponse
    | Promise<ArchiveComponentResponse>
    | Observable<ArchiveComponentResponse> {
    return this.commandBus.execute(new ArchiveComponentCommand(request));
  }
  getComponent(
    request: GetComponentRequest,
  ):
    | GetComponentResponse
    | Promise<GetComponentResponse>
    | Observable<GetComponentResponse> {
    return this.queryBus.execute(new GetComponentQuery(request));
  }
  getComponentList(
    request: GetComponentListRequest,
  ):
    | GetComponentListResponse
    | Promise<GetComponentListResponse>
    | Observable<GetComponentListResponse> {
    return this.queryBus.execute(new GetComponentListQuery(request));
  }
  createComponent(
    request: CreateComponentRequest,
  ):
    | CreateComponentResponse
    | Promise<CreateComponentResponse>
    | Observable<CreateComponentResponse> {
    return this.commandBus.execute(new CreateComponentCommand(request));
  }

  getOrCreateFirstPage(
    request: GetOrCreateFirstPageRequest,
  ): GetPageResponse | Observable<GetPageResponse> | Promise<GetPageResponse> {
    return this.commandBus.execute(new GetOrCreateFirstPageCommand(request));
  }
  updateSite(
    request: UpdateSiteRequest,
  ):
    | UpdateSiteResponse
    | Promise<UpdateSiteResponse>
    | Observable<UpdateSiteResponse> {
    return this.commandBus.execute(new UpdateSiteCommand(request));
  }
  createPage(
    request: CreatePageRequest,
  ):
    | CreatePageResponse
    | Promise<CreatePageResponse>
    | Observable<CreatePageResponse> {
    return this.commandBus.execute(new CreatePageCommand(request));
  }
  suspendSite(
    request: SuspendSiteRequest,
  ):
    | SuspendSiteResponse
    | Promise<SuspendSiteResponse>
    | Observable<SuspendSiteResponse> {
    return this.commandBus.execute(new SuspendSiteCommand(request));
  }
  getPageList(
    request: GetPageListRequest,
  ):
    | GetPageListResponse
    | Promise<GetPageListResponse>
    | Observable<GetPageListResponse> {
    return this.queryBus.execute(new GetPageListQuery(request));
  }
  getPage(
    request: GetPageRequest,
  ): GetPageResponse | Promise<GetPageResponse> | Observable<GetPageResponse> {
    return this.queryBus.execute(new GetPageQuery(request));
  }
  updatePage(
    request: UpdatePageRequest,
  ):
    | UpdatePageResponse
    | Promise<UpdatePageResponse>
    | Observable<UpdatePageResponse> {
    return this.commandBus.execute(new UpdatePageCommand(request));
  }
  deletePage(
    request: DeletePageRequest,
  ):
    | DeletePageResponse
    | Promise<DeletePageResponse>
    | Observable<DeletePageResponse> {
    return this.commandBus.execute(new DeletePageCommand(request));
  }
  archivePage(
    request: ArchivePageRequest,
  ):
    | ArchivePageResponse
    | Promise<ArchivePageResponse>
    | Observable<ArchivePageResponse> {
    return this.commandBus.execute(new ArchivePageCommand(request));
  }

  createSite(
    request: CreateSiteRequest,
  ):
    | CreateSiteResponse
    | Promise<CreateSiteResponse>
    | Observable<CreateSiteResponse> {
    return this.commandBus.execute(new CreateSiteCommand(request));
  }
  getSite(
    request: GetSiteRequest,
  ): GetSiteResponse | Promise<GetSiteResponse> | Observable<GetSiteResponse> {
    return this.queryBus.execute(new GetSiteQuery(request));
  }
  getSiteList(
    request: GetSiteListRequest,
  ):
    | GetSiteListResponse
    | Promise<GetSiteListResponse>
    | Observable<GetSiteListResponse> {
    return this.queryBus.execute(new GetSiteListQuery(request));
  }
}
