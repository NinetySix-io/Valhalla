import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  TenantAvailableRequest,
  TenantAvailableResponse,
} from '@app/rpc/protobuf/tenants';

import { Logger } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';

export class TenantAvailableCommand implements ICommand {
  constructor(public readonly input: TenantAvailableRequest) {}
}

@CommandHandler(TenantAvailableCommand)
@RpcHandler()
export class TenantAvailableHandler
  implements ICommandHandler<TenantAvailableCommand, TenantAvailableResponse>
{
  constructor(private readonly eventBus: EventBus) {}

  async execute(
    command: TenantAvailableCommand,
  ): Promise<TenantAvailableResponse> {
    Logger.debug(command.input);
    throw new Error('Not implemented');
  }
}
