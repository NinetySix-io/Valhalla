import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  DeleteTenantRequest,
  DeleteTenantResponse,
} from '@serv.tenants/protobuf/tenants';

import { LoggerService } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';

export class DeleteTenantCommand implements ICommand {
  constructor(public readonly input: DeleteTenantRequest) {}
}

@CommandHandler(DeleteTenantCommand)
@RpcHandler()
export class DeleteTenantHandler
  implements ICommandHandler<DeleteTenantCommand, DeleteTenantResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly logger: LoggerService,
  ) {}

  async execute(command: DeleteTenantCommand): Promise<DeleteTenantResponse> {
    this.logger.debug(command.input);
    throw new Error('Not implemented');
  }
}
