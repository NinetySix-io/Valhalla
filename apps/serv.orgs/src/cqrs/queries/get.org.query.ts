import { GetOrgRequest, GetOrgResponse } from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Logger } from '@nestjs/common';

export class GetOrgQuery implements IQuery {
  constructor(public readonly request: GetOrgRequest) {}
}

@QueryHandler(GetOrgQuery)
export class GetOrgHandler
  implements IQueryHandler<GetOrgQuery, GetOrgResponse>
{
  async execute(command: GetOrgQuery): Promise<GetOrgResponse> {
    Logger.debug(command);
    throw new Error('Not implemented');
  }
}
