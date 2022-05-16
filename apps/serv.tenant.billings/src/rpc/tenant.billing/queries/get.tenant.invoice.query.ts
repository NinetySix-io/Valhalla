import { CacheStore, CACHE_MANAGER, Inject, Logger } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  GetTenantInvoiceRequest,
  GetTenantInvoiceResponse,
} from '@serv.tenant.billings/protobuf/tenant.billing';

export class GetTenantInvoiceQuery implements IQuery {
  constructor(public readonly request: GetTenantInvoiceRequest) {}
}

@QueryHandler(GetTenantInvoiceQuery)
export class GetTenantInvoiceHandler
  implements IQueryHandler<GetTenantInvoiceQuery, GetTenantInvoiceResponse>
{
  constructor(@Inject(CACHE_MANAGER) private readonly cacheStore: CacheStore) {}

  async execute(
    command: GetTenantInvoiceQuery,
  ): Promise<GetTenantInvoiceResponse> {
    Logger.debug(command);
    throw new Error('Not yet implemented');
  }
}
