import { GetSiteRequest, GetSiteResponse } from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcHandler, Serializer, toObjectId } from '@valhalla/serv.core';

import { FilterQuery } from 'mongoose';
import { SiteProto } from '@app/cqrs/transformers/site.proto';
import { SiteSchema } from '@app/entities/sites/schema';
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
    const query: FilterQuery<SiteSchema> = {};
    const { siteId } = command.request;
    query._id = toObjectId(siteId);
    const site = await this.sites.findOne(query).lean().orFail();
    const serialized = Serializer.from(SiteProto).serialize(site);
    return { data: serialized };
  }
}
