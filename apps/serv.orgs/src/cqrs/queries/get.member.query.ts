import { GetMemberRequest, GetMemberResponse } from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcHandler, Serializer, toObjectId } from '@valhalla/serv.core';

import { OrgMemberProto } from '../protos/org.member.proto';
import { OrgMembersModel } from '@app/entities/org.members';

export class GetMemberQuery implements IQuery {
  constructor(public readonly request: GetMemberRequest) {}
}

@QueryHandler(GetMemberQuery)
@RpcHandler()
export class GetMemberHandler
  implements IQueryHandler<GetMemberQuery, GetMemberResponse>
{
  constructor(private readonly members: OrgMembersModel) {}

  async execute(command: GetMemberQuery): Promise<GetMemberResponse> {
    const { userId, orgId } = command.request;
    const user = toObjectId(userId);
    const organization = toObjectId(orgId);
    const member = await this.members
      .findOne({ user, organization })
      .lean()
      .orFail();

    const serialized = Serializer.from(OrgMemberProto).serialize(member);
    return { member: serialized };
  }
}
