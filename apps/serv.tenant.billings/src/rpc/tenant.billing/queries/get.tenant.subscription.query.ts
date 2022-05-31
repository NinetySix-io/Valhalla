import {
  GetTenantSubscriptionRequest,
  GetTenantSubscriptionResponse,
} from '@app/rpc/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Logger } from '@nestjs/common';

export class GetTenantSubscriptionQuery implements IQuery {
  constructor(public readonly request: GetTenantSubscriptionRequest) {}
}

@QueryHandler(GetTenantSubscriptionQuery)
export class GetTenantSubscriptionHandler
  implements
    IQueryHandler<GetTenantSubscriptionQuery, GetTenantSubscriptionResponse>
{
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async execute(
    command: GetTenantSubscriptionQuery,
  ): Promise<GetTenantSubscriptionResponse> {
    Logger.debug(command);
    throw new Error('Not implemented');
  }
}
