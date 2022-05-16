import {
  GetTenantRequest,
  GetTenantResponse,
} from '@serv.tenants/protobuf/tenants';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { LoggerService } from '@nestjs/common';

export class GetTenantQuery implements IQuery {
  constructor(public readonly request: GetTenantRequest) {}
}

@QueryHandler(GetTenantQuery)
export class GetTenantHandler
  implements IQueryHandler<GetTenantQuery, GetTenantResponse>
{
  constructor(private readonly logger: LoggerService) {}

  async execute(command: GetTenantQuery): Promise<GetTenantResponse> {
    this.logger.debug(command);
    throw new Error('Not implemented');
  }
}
