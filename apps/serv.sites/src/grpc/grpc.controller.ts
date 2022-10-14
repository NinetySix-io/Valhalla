import {
  AddPageElementRequest,
  AddPageElementResponse,
  ArchivePageRequest,
  ArchivePageResponse,
  CloneSectionRequest,
  CloneSectionResponse,
  CreatePageRequest,
  CreatePageResponse,
  CreateSectionRequest,
  CreateSectionResponse,
  CreateSiteRequest,
  CreateSiteResponse,
  DeleteManyPageElementsRequest,
  DeleteManyPageElementsResponse,
  DeletePageElementListByGroupRequest,
  DeletePageElementListByGroupResponse,
  DeletePageElementRequest,
  DeletePageElementResponse,
  DeletePageRequest,
  DeletePageResponse,
  DeleteSectionRequest,
  DeleteSectionResponse,
  GetPageElementListByGroupRequest,
  GetPageElementListByGroupResponse,
  GetPageListRequest,
  GetPageListResponse,
  GetPageRequest,
  GetPageResponse,
  GetPageSectionListRequest,
  GetPageSectionListResponse,
  GetPageSectionRequest,
  GetPageSectionResponse,
  GetSiteListRequest,
  GetSiteListResponse,
  GetSiteRequest,
  GetSiteResponse,
  SITES_SERVICE_NAME,
  SitesServiceController,
  SuspendSiteRequest,
  SuspendSiteResponse,
  UpdatePageElementRequest,
  UpdatePageElementResponse,
  UpdatePageRequest,
  UpdatePageResponse,
  UpdateSectionFormatRequest,
  UpdateSectionIndexRequest,
  UpdateSectionResponse,
  UpdateSiteRequest,
  UpdateSiteResponse,
} from '@app/protobuf';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { AddPageElementCommand } from '@app/cqrs/commands/add.page.element.command';
import { ArchivePageCommand } from '@app/cqrs/commands/archive.page.command';
import { CloneSectionCommand } from '@app/cqrs/commands/clone.section.command';
import { Controller } from '@nestjs/common';
import { CreatePageCommand } from '@app/cqrs/commands/create.page.command';
import { CreateSectionCommand } from '@app/cqrs/commands/create.section.command';
import { CreateSiteCommand } from '@app/cqrs/commands/create.site.command';
import { DeleteManyPageElementsCommand } from '@app/cqrs/commands/delete.many.page.elements.command';
import { DeletePageCommand } from '@app/cqrs/commands/delete.page.command';
import { DeletePageElementCommand } from '@app/cqrs/commands/delete.page.element.command';
import { DeletePageElementListByGroupCommand } from '@app/cqrs/commands/delete.page.element.list.by.group.command';
import { DeleteSectionCommand } from '@app/cqrs/commands/delete.section.command';
import { GetPageElementListByGroupQuery } from '@app/cqrs/queries/get.page.element.list.by.group.query';
import { GetPageListQuery } from '@app/cqrs/queries/get.page.list.query';
import { GetPageQuery } from '@app/cqrs/queries/get.page.query';
import { GetPageSectionListQuery } from '@app/cqrs/queries/get.page.section.list.query';
import { GetPageSectionQuery } from '@app/cqrs/queries/get.page.section.query';
import { GetSiteListQuery } from '@app/cqrs/queries/get.site.list.query';
import { GetSiteQuery } from '@app/cqrs/queries/get.site.query';
import { GrpcClass } from '@valhalla/serv.core';
import { Observable } from 'rxjs';
import { SuspendSiteCommand } from '@app/cqrs/commands/suspend.site.command';
import { UpdatePageCommand } from '@app/cqrs/commands/update.page.command';
import { UpdatePageElementCommand } from '@app/cqrs/commands/update.page.element.command';
import { UpdateSectionFormatCommand } from '@app/cqrs/commands/update.section.format.command';
import { UpdateSectionIndexCommand } from '@app/cqrs/commands/update.section.index.command';
import { UpdateSiteCommand } from '@app/cqrs/commands/update.site.command';

@Controller()
@GrpcClass(SITES_SERVICE_NAME)
export class gRpcController implements SitesServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  updatePageElement(
    request: UpdatePageElementRequest,
  ):
    | UpdatePageElementResponse
    | Promise<UpdatePageElementResponse>
    | Observable<UpdatePageElementResponse> {
    return this.commandBus.execute(new UpdatePageElementCommand(request));
  }
  getPageElementListByGroup(
    request: GetPageElementListByGroupRequest,
  ):
    | GetPageElementListByGroupResponse
    | Promise<GetPageElementListByGroupResponse>
    | Observable<GetPageElementListByGroupResponse> {
    return this.queryBus.execute(new GetPageElementListByGroupQuery(request));
  }
  deletePageElementListByGroup(
    request: DeletePageElementListByGroupRequest,
  ):
    | DeletePageElementListByGroupResponse
    | Promise<DeletePageElementListByGroupResponse>
    | Observable<DeletePageElementListByGroupResponse> {
    return this.commandBus.execute(
      new DeletePageElementListByGroupCommand(request),
    );
  }
  addPageElement(
    request: AddPageElementRequest,
  ):
    | AddPageElementResponse
    | Promise<AddPageElementResponse>
    | Observable<AddPageElementResponse> {
    return this.commandBus.execute(new AddPageElementCommand(request));
  }
  deletePageElement(
    request: DeletePageElementRequest,
  ):
    | DeletePageElementResponse
    | Promise<DeletePageElementResponse>
    | Observable<DeletePageElementResponse> {
    return this.commandBus.execute(new DeletePageElementCommand(request));
  }

  cloneSection(
    request: CloneSectionRequest,
  ):
    | CloneSectionResponse
    | Promise<CloneSectionResponse>
    | Observable<CloneSectionResponse> {
    return this.commandBus.execute(new CloneSectionCommand(request));
  }

  deleteManyPageElements(
    request: DeleteManyPageElementsRequest,
  ):
    | DeleteManyPageElementsResponse
    | Promise<DeleteManyPageElementsResponse>
    | Observable<DeleteManyPageElementsResponse> {
    return this.commandBus.execute(new DeleteManyPageElementsCommand(request));
  }

  updateSectionIndex(
    request: UpdateSectionIndexRequest,
  ):
    | UpdateSectionResponse
    | Promise<UpdateSectionResponse>
    | Observable<UpdateSectionResponse> {
    return this.commandBus.execute(new UpdateSectionIndexCommand(request));
  }
  updateSectionFormat(
    request: UpdateSectionFormatRequest,
  ):
    | UpdateSectionResponse
    | Promise<UpdateSectionResponse>
    | Observable<UpdateSectionResponse> {
    return this.commandBus.execute(new UpdateSectionFormatCommand(request));
  }
  updateSite(
    request: UpdateSiteRequest,
  ):
    | UpdateSiteResponse
    | Promise<UpdateSiteResponse>
    | Observable<UpdateSiteResponse> {
    return this.commandBus.execute(new UpdateSiteCommand(request));
  }

  getPageSection(
    request: GetPageSectionRequest,
  ):
    | GetPageSectionResponse
    | Observable<GetPageSectionResponse>
    | Promise<GetPageSectionResponse> {
    return this.queryBus.execute(new GetPageSectionQuery(request));
  }
  getPageSectionList(
    request: GetPageSectionListRequest,
  ):
    | GetPageSectionListResponse
    | Observable<GetPageSectionListResponse>
    | Promise<GetPageSectionListResponse> {
    return this.queryBus.execute(new GetPageSectionListQuery(request));
  }
  createSection(
    request: CreateSectionRequest,
  ):
    | CreateSectionResponse
    | Observable<CreateSectionResponse>
    | Promise<CreateSectionResponse> {
    return this.commandBus.execute(new CreateSectionCommand(request));
  }

  deleteSection(
    request: DeleteSectionRequest,
  ):
    | DeleteSectionResponse
    | Observable<DeleteSectionResponse>
    | Promise<DeleteSectionResponse> {
    return this.commandBus.execute(new DeleteSectionCommand(request));
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
