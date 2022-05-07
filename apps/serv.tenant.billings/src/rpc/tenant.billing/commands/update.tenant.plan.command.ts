import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  UpdateTenantPlanRequest,
  UpdateTenantPlanResponse,
} from '@serv.tenant.billings/protobuf/tenant.billing';

import { Logger } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';
import { TenantPlansModel } from '@serv.tenant.billings/entities/tenant.plans';

export class UpdateTenantPlanCommand implements ICommand {
  constructor(
    public readonly tenantId: string,
    public readonly input: UpdateTenantPlanRequest,
  ) {}
}

@CommandHandler(UpdateTenantPlanCommand)
@RpcHandler()
export class UpdateTenantPlanHandler
  implements ICommandHandler<UpdateTenantPlanCommand, UpdateTenantPlanResponse>
{
  constructor(
    private readonly plans: TenantPlansModel,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: UpdateTenantPlanCommand,
  ): Promise<UpdateTenantPlanResponse> {
    Logger.debug(command);
    throw new Error('Not yet implemented');
  }
}
