import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  UpdateTenantRequest,
  UpdateTenantResponse,
} from '@serv.tenants/protobuf/tenants';

import { LoggerService } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';

export class UpdateTenantCommand implements ICommand {
  constructor(public readonly input: UpdateTenantRequest) {}
}

@CommandHandler(UpdateTenantCommand)
@RpcHandler()
export class UpdateTenantHandler
  implements ICommandHandler<UpdateTenantCommand, UpdateTenantResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly logger: LoggerService,
  ) {}

  async execute(command: UpdateTenantCommand): Promise<UpdateTenantResponse> {
    this.logger.debug(command.input);
    throw new Error('Not implemented');
  }
}
