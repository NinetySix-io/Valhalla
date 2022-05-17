import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  UpdateTenantRequest,
  UpdateTenantResponse,
} from '@app/protobuf/tenants';

import { Logger } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';

export class UpdateTenantCommand implements ICommand {
  constructor(public readonly input: UpdateTenantRequest) {}
}

@CommandHandler(UpdateTenantCommand)
@RpcHandler()
export class UpdateTenantHandler
  implements ICommandHandler<UpdateTenantCommand, UpdateTenantResponse>
{
  constructor(private readonly eventBus: EventBus) {}

  async execute(command: UpdateTenantCommand): Promise<UpdateTenantResponse> {
    Logger.debug(command.input);
    throw new Error('Not implemented');
  }
}