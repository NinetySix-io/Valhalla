import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  DeleteTenantPlanRequest,
  DeleteTenantPlanResponse,
} from '@app/rpc/protobuf';

import { Logger } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';
import { TenantPlansModel } from '@app/entities/tenant.plans';

export class DeleteTenantPlanCommand implements ICommand {
  constructor(public readonly input: DeleteTenantPlanRequest) {}
}

@CommandHandler(DeleteTenantPlanCommand)
@RpcHandler()
export class DeleteTenantPlanHandler
  implements ICommandHandler<DeleteTenantPlanCommand, DeleteTenantPlanResponse>
{
  constructor(
    private readonly plans: TenantPlansModel,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: DeleteTenantPlanCommand,
  ): Promise<DeleteTenantPlanResponse> {
    Logger.debug(command.input);
    throw new Error('Not yet implemented');
  }
}
