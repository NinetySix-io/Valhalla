import {
  GetUserMembershipsRequest,
  GetUserMembershipsResponse,
} from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcHandler, Serializer } from '@valhalla/serv.core';

import { OrgMembersModel } from '@app/entities/org.members';
import { OrgProto } from '../protos/org.proto';
import { OrganizationsModel } from '@app/entities/organizations';
import isEmpty from 'lodash.isempty';

export class GetUserMembershipsQuery implements IQuery {
  constructor(public readonly request: GetUserMembershipsRequest) {}
}

@QueryHandler(GetUserMembershipsQuery)
@RpcHandler()
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

    const organizations = await this.organizations
      .find({ _id: organizationIDs })
      .lean()
      .orFail();

    const serialized = Serializer.from(OrgProto).serialize(organizations);
    return { organizations: serialized };
  }
}
