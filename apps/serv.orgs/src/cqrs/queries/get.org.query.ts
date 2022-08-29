import { GetOrgRequest, GetOrgResponse } from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { FilterQuery } from 'mongoose';
import { OrganizationSchema } from '@app/entities/organizations/schema';
import { OrganizationTransformer } from '@app/entities/organizations/transformer';
import { OrganizationsModel } from '@app/entities/organizations';
import isEmpty from 'lodash.isempty';

export class GetOrgQuery implements IQuery {
  constructor(public readonly request: GetOrgRequest) {}
}

@QueryHandler(GetOrgQuery)
@RpcHandler()
export class GetOrgHandler
  implements IQueryHandler<GetOrgQuery, GetOrgResponse>
{
  constructor(private readonly organizations: OrganizationsModel) {}

  async execute(command: GetOrgQuery): Promise<GetOrgResponse> {
    const requestQuery = command.request.query;
    const filter: FilterQuery<OrganizationSchema> = {};

    if (requestQuery.$case === 'orgId') {
      filter._id = toObjectId(requestQuery.orgId);
    } else if (requestQuery.$case === 'orgSlug') {
      filter.slug = requestQuery.orgSlug;
    }

    if (isEmpty(filter)) {
      throw new Error('Invalid query');
    }

    const organization = await this.organizations.findOne(filter);

    return {
      organization: organization
        ? new OrganizationTransformer(organization).proto
        : undefined,
    };
  }
}
