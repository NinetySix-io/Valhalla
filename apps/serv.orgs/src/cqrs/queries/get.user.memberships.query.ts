import {
  GetUserMembershipsRequest,
  GetUserMembershipsResponse,
} from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { OrgMembersModel } from '@app/entities/org.members';
import { OrganizationTransformer } from '@app/entities/organizations/transformer';
import { OrganizationsModel } from '@app/entities/organizations';
import { isEmpty } from '@valhalla/utilities';

export class GetUserMembershipsQuery implements IQuery {
  constructor(public readonly request: GetUserMembershipsRequest) {}
}

@QueryHandler(GetUserMembershipsQuery)
export class GetUserMembershipsHandler
  implements IQueryHandler<GetUserMembershipsQuery, GetUserMembershipsResponse>
{
  constructor(
    private readonly organizations: OrganizationsModel,
    private readonly members: OrgMembersModel,
  ) {}

  async execute(
    command: GetUserMembershipsQuery,
  ): Promise<GetUserMembershipsResponse> {
    const { userId } = command.request;
    const organizationIDs = await this.members
      .find({ user: userId })
      .distinct('organization');

    if (isEmpty(organizationIDs)) {
      return {
        organizations: [],
      };
    }

    const organizations = await this.organizations.find({
      _id: organizationIDs,
    });

    return {
      organizations: organizations.map(
        (org) => new OrganizationTransformer(org).proto,
      ),
    };
  }
}
