import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateSiteRequest,
  CreateSiteResponse,
  GetSiteListRequest,
  GetSiteListResponse,
  GetSiteRequest,
  GetSiteResponse,
  SITES_SERVICE_NAME,
  SitesServiceController,
} from '@app/protobuf';

import { Controller } from '@nestjs/common';
import { CreateSiteCommand } from '@app/cqrs/commands/create.site.command';
import { GetSiteListQuery } from '@app/cqrs/queries/get.site.list.query';
import { GetSiteQuery } from '@app/cqrs/queries/get.site.query';
import { GrpcClass } from '@valhalla/serv.core';
import { Observable } from 'rxjs';

@Controller()
@GrpcClass(SITES_SERVICE_NAME)
export class gRpcController implements SitesServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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
