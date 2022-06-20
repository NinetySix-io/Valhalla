import { GetSiteRequest, GetSiteResponse } from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { RpcHandler } from '@valhalla/serv.core';
import { SiteTransformer } from '@app/entities/sites/transformer';
import { SitesModel } from '@app/entities/sites';

export class GetSiteQuery implements IQuery {
  constructor(public readonly request: GetSiteRequest) {}
}

@QueryHandler(GetSiteQuery)
@RpcHandler()
export class GetSiteHandler
  implements IQueryHandler<GetSiteQuery, GetSiteResponse>
{
  constructor(private readonly sites: SitesModel) {}

  async execute(command: GetSiteQuery): Promise<GetSiteResponse> {
    const site = await this.sites.findById(command.request.siteId);
    return {
      site: site ? new SiteTransformer(site).proto : undefined,
    };
  }
}
