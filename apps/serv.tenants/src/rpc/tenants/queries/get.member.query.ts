import { GetMemberRequest, GetMemberResponse } from '@app/rpc/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Logger } from '@nestjs/common';

export class GetMemberQuery implements IQuery {
  constructor(public readonly request: GetMemberRequest) {}
}

@QueryHandler(GetMemberQuery)
export class GetMemberHandler
  implements IQueryHandler<GetMemberQuery, GetMemberResponse>
{
  async execute(command: GetMemberQuery): Promise<GetMemberResponse> {
    Logger.debug(command);
    throw new Error('Not implemented');
  }
}
