import { GetMemberRequest, Member } from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { OrgMemberTransformer } from '@app/entities/org.members/transformer';
import { OrgMembersModel } from '@app/entities/org.members';
import { toObjectId } from '@valhalla/serv.core';

export class GetMemberQuery implements IQuery {
  constructor(public readonly request: GetMemberRequest) {}
}

@QueryHandler(GetMemberQuery)
export class GetMemberHandler implements IQueryHandler<GetMemberQuery, Member> {
  constructor(private readonly members: OrgMembersModel) {}

  async execute(command: GetMemberQuery): Promise<Member> {
    const { userId, orgId } = command.request;
    const user = toObjectId(userId);
    const organization = toObjectId(orgId);
    const member = await this.members
      .findOne({ user, organization })
      .orFail(() => new Error('Organization member not found!'));

    return new OrgMemberTransformer(member).proto;
  }
}
