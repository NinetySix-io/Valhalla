import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  IQuery,
} from '@nestjs/cqrs';
import { TenantAvailableRequest, TenantAvailableResponse } from '@app/protobuf';

import { Logger } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';

export class TenantAvailableQuery implements IQuery {
  constructor(public readonly input: TenantAvailableRequest) {}
}

@CommandHandler(TenantAvailableQuery)
@RpcHandler()
export class TenantAvailableHandler
  implements ICommandHandler<TenantAvailableQuery, TenantAvailableResponse>
{
  constructor(private readonly eventBus: EventBus) {}

  async execute(query: TenantAvailableQuery): Promise<TenantAvailableResponse> {
    Logger.debug(query.input);
    throw new Error('Not implemented');
  }
}
