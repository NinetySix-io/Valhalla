import {
  ArchivePageRequest,
  ArchivePageResponse,
  CreatePageRequest,
  CreatePageResponse,
  CreateSiteRequest,
  CreateSiteResponse,
  DeletePageRequest,
  DeletePageResponse,
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
  UpdatePageRequest,
  UpdatePageResponse,
  UpdateSiteRequest,
  UpdateSiteResponse,
} from '@app/protobuf';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ArchivePageCommand } from '@app/cqrs/commands/archive.page.command';
import { Controller } from '@nestjs/common';
import { CreatePageCommand } from '@app/cqrs/commands/create.page.command';
import { CreateSiteCommand } from '@app/cqrs/commands/create.site.command';
import { DeletePageCommand } from '@app/cqrs/commands/delete.page.command';
import { GetPageListQuery } from '@app/cqrs/queries/get.page.list.query';
import { GetPageQuery } from '@app/cqrs/queries/get.page.query';
import { GetSiteListQuery } from '@app/cqrs/queries/get.site.list.query';
import { GetSiteQuery } from '@app/cqrs/queries/get.site.query';
import { GrpcClass } from '@valhalla/serv.core';
import { Observable } from 'rxjs';
import { SuspendSiteCommand } from '@app/cqrs/commands/suspend.site.command';
import { UpdatePageCommand } from '@app/cqrs/commands/update.page.command';
import { UpdateSiteCommand } from '@app/cqrs/commands/update.site.command';

@Controller()
@GrpcClass(SITES_SERVICE_NAME)
export class gRpcController implements SitesServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
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
