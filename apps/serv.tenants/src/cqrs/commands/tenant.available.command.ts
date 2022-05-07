import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  TenantAvailableRequest,
  TenantAvailableResponse,
} from '@serv.tenants/protobuf/tenants';

import { LoggerService } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';

export class TenantAvailableCommand implements ICommand {
  constructor(public readonly input: TenantAvailableRequest) {}
}

@CommandHandler(TenantAvailableCommand)
@RpcHandler()
export class TenantAvailableHandler
  implements ICommandHandler<TenantAvailableCommand, TenantAvailableResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly logger: LoggerService,
  ) {}

  async execute(
    command: TenantAvailableCommand,
  ): Promise<TenantAvailableResponse> {
    this.logger.debug(command.input);
    throw new Error('Not implemented');
  }
}
