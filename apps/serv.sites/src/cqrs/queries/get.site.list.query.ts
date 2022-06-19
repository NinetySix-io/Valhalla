import { GetSiteListRequest, GetSiteListResponse } from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FilterQuery } from 'mongoose';
import { SiteSchema } from '@app/entities/sites/schema';
import { SiteTransformer } from '@app/entities/sites/transformer';
import { SitesModel } from '@app/entities/sites';
import { isEmpty } from '@valhalla/utilities';
import { toObjectId } from '@valhalla/serv.core';

export class GetSiteListQuery implements IQuery {
  constructor(public readonly request: GetSiteListRequest) {}
}

@QueryHandler(GetSiteListQuery)
export class GetSiteListHandler
  implements IQueryHandler<GetSiteListQuery, GetSiteListResponse>
{
  constructor(private readonly sites: SitesModel) {}

  async execute(command: GetSiteListQuery): Promise<GetSiteListResponse> {
    const query: FilterQuery<SiteSchema> = {};

    if (command.request.query.$case === 'ownBy') {
      query.ownBy = toObjectId(command.request.query.ownBy);
    }

    if (isEmpty(query)) {
      throw new Error('Invalid Query');
    }

    const sites = await this.sites.find(query);
    return {
      sites: sites.map((site) => new SiteTransformer(site).proto),
    };
  }
}
