import { GetMemberRequest, GetMemberResponse } from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { OrgMemberTransformer } from '@app/entities/org.members/transformer';
import { OrgMembersModel } from '@app/entities/org.members';
import { toObjectId } from '@valhalla/serv.core';

export class GetMemberQuery implements IQuery {
  constructor(public readonly request: GetMemberRequest) {}
}

@QueryHandler(GetMemberQuery)
export class GetMemberHandler
  implements IQueryHandler<GetMemberQuery, GetMemberResponse>
{
  constructor(private readonly members: OrgMembersModel) {}

  async execute(command: GetMemberQuery): Promise<GetMemberResponse> {
    const { userId, orgId } = command.request;
    const user = toObjectId(userId);
    const organization = toObjectId(orgId);
    const member = await this.members.findOne({ user, organization });

    return {
      member: member ? new OrgMemberTransformer(member).proto : null,
    };
  }
}
