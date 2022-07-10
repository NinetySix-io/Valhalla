import {
  ArchiveComponentRequest,
  ArchiveComponentResponse,
  ArchivePageRequest,
  ArchivePageResponse,
  CreateComponentRequest,
  CreateComponentResponse,
  CreatePageRequest,
  CreatePageResponse,
  CreateSiteRequest,
  CreateSiteResponse,
  DeleteComponentRequest,
  DeleteComponentResponse,
  DeletePageRequest,
  DeletePageResponse,
  GetComponentElementListRequest,
  GetComponentElementListResponse,
  GetComponentListRequest,
  GetComponentListResponse,
  GetComponentRequest,
  GetComponentResponse,
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
  UpdatePageRequest,
  UpdatePageResponse,
  UpdateSiteRequest,
  UpdateSiteResponse,
} from '@app/protobuf';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ArchiveComponentCommand } from '@app/cqrs/commands/archive.component.command';
import { ArchivePageCommand } from '@app/cqrs/commands/archive.page.command';
import { Controller } from '@nestjs/common';
import { CreateComponentCommand } from '@app/cqrs/commands/create.component.command';
import { CreatePageCommand } from '@app/cqrs/commands/create.page.command';
import { CreateSiteCommand } from '@app/cqrs/commands/create.site.command';
import { DeleteComponentCommand } from '@app/cqrs/commands/delete.component.command';
import { DeletePageCommand } from '@app/cqrs/commands/delete.page.command';
import { GetComponentElementListQuery } from '@app/cqrs/queries/get.component.elements.list.query';
import { GetComponentListQuery } from '@app/cqrs/queries/get.component.list.query';
import { GetComponentQuery } from '@app/cqrs/queries/get.component.query';
import { GetOrCreateFirstPageCommand } from '@app/cqrs/commands/get.or.create.first.page.command';
import { GetPageListQuery } from '@app/cqrs/queries/get.page.list.query';
import { GetPageQuery } from '@app/cqrs/queries/get.page.query';
import { GetSiteListQuery } from '@app/cqrs/queries/get.site.list.query';
import { GetSiteQuery } from '@app/cqrs/queries/get.site.query';
import { GrpcClass } from '@valhalla/serv.core';
import { Observable } from 'rxjs';
import { SuspendSiteCommand } from '@app/cqrs/commands/suspend.site.command';
import { UpdateComponentCommand } from '@app/cqrs/commands/update.component.command';
import { UpdatePageCommand } from '@app/cqrs/commands/update.page.command';
import { UpdateSiteCommand } from '@app/cqrs/commands/update.site.command';

@Controller()
@GrpcClass(SITES_SERVICE_NAME)
export class gRpcController implements SitesServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
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
  getComponentElementList(
    request: GetComponentElementListRequest,
  ):
    | GetComponentElementListResponse
    | Promise<GetComponentElementListResponse>
    | Observable<GetComponentElementListResponse> {
    return this.queryBus.execute(new GetComponentElementListQuery(request));
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
