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
import { GrpcClass, LogClassMethods } from '@valhalla/serv.core';

import { Controller } from '@nestjs/common';
import { CreateSiteCommand } from '@app/cqrs/commands/create.site.command';
import { GetSiteListQuery } from '@app/cqrs/queries/get.site.list.query';
import { GetSiteQuery } from '@app/cqrs/queries/get.site.query';
import { GrpcLogger } from './grpc.logger';
import { Observable } from 'rxjs';
import { isDev } from '@valhalla/utilities';

@Controller()
@GrpcClass(SITES_SERVICE_NAME)
@LogClassMethods({
  when: isDev(),
  onTrigger: (fnName) => GrpcLogger.debug(`gRPC: ${fnName}`),
})
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
