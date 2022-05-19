import { GetMemberRequest, GetMemberResponse } from '@app/rpc/protobuf/tenants';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Logger } from '@nestjs/common';

export class GetMemberQuery implements IQuery {
  constructor(public readonly request: GetMemberRequest) {}
}

@QueryHandler(GetMemberQuery)
export class GetMemberHandler
  implements IQueryHandler<GetMemberQuery, GetMemberResponse>
{
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async execute(command: GetMemberQuery): Promise<GetMemberResponse> {
    Logger.debug(command);
    throw new Error('Not implemented');
  }
}
