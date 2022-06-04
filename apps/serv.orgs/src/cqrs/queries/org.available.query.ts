import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  IQuery,
} from '@nestjs/cqrs';
import { OrgAvailableRequest, OrgAvailableResponse } from '@app/protobuf';

import { Logger } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';

export class OrgAvailableQuery implements IQuery {
  constructor(public readonly input: OrgAvailableRequest) {}
}

@CommandHandler(OrgAvailableQuery)
@RpcHandler()
export class OrgAvailableHandler
  implements ICommandHandler<OrgAvailableQuery, OrgAvailableResponse>
{
  constructor(private readonly eventBus: EventBus) {}

  async execute(query: OrgAvailableQuery): Promise<OrgAvailableResponse> {
    Logger.debug(query.input);
    throw new Error('Not implemented');
  }
}
