import { GetOrgMemberRequest, GetOrgMemberResponse } from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Logger } from '@nestjs/common';

export class GetMemberQuery implements IQuery {
  constructor(public readonly request: GetOrgMemberRequest) {}
}

@QueryHandler(GetMemberQuery)
export class GetMemberHandler
  implements IQueryHandler<GetMemberQuery, GetOrgMemberResponse>
{
  async execute(command: GetMemberQuery): Promise<GetOrgMemberResponse> {
    Logger.debug(command);
    throw new Error('Not implemented');
  }
}
