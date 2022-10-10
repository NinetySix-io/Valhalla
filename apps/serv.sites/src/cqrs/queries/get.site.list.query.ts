import { GetSiteListRequest, GetSiteListResponse } from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcHandler, Serializer, toObjectId } from '@valhalla/serv.core';

import { FilterQuery } from 'mongoose';
import { SiteProto } from '../transformers/site.proto';
import { SiteSchema } from '@app/entities/sites/schema';
import { SitesModel } from '@app/entities/sites';
import isEmpty from 'lodash.isempty';

export class GetSiteListQuery implements IQuery {
  constructor(public readonly request: GetSiteListRequest) {}
}

@QueryHandler(GetSiteListQuery)
@RpcHandler()
export class GetSiteListHandler
  implements IQueryHandler<GetSiteListQuery, GetSiteListResponse>
{
  constructor(private readonly sites: SitesModel) {}

  async execute(command: GetSiteListQuery): Promise<GetSiteListResponse> {
    const query: FilterQuery<SiteSchema> = {};
    query.ownBy = toObjectId(command.request.ownerId);

    if (isEmpty(query)) {
      throw new Error('Invalid Query');
    }

    const sites = await this.sites.find(query).lean();
    const serialized = Serializer.from(SiteProto).serialize(sites);
    return { data: serialized };
  }
}
