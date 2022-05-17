import {
  GetTenantPlanRequest,
  GetTenantPlanResponse,
} from '@app/protobuf/tenant.billing';
import { IQuery, IQueryHandler } from '@nestjs/cqrs';

import { Logger } from '@nestjs/common';

export class GetTenantPlanQuery implements IQuery {
  constructor(public readonly request: GetTenantPlanRequest) {}
}

export class GetTenantPlanHandler
  implements IQueryHandler<GetTenantPlanQuery, GetTenantPlanResponse>
{
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async execute(command: GetTenantPlanQuery): Promise<GetTenantPlanResponse> {
    Logger.debug(command);
    throw new Error('Not implemented');
  }
}
