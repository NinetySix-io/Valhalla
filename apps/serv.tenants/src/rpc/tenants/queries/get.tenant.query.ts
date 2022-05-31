import { GetTenantRequest, GetTenantResponse } from '@app/rpc/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Logger } from '@nestjs/common';

export class GetTenantQuery implements IQuery {
  constructor(public readonly request: GetTenantRequest) {}
}

@QueryHandler(GetTenantQuery)
export class GetTenantHandler
  implements IQueryHandler<GetTenantQuery, GetTenantResponse>
{
  async execute(command: GetTenantQuery): Promise<GetTenantResponse> {
    Logger.debug(command);
    throw new Error('Not implemented');
  }
}
