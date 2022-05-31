import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  CreateTenantPlanRequest,
  CreateTenantPlanResponse,
} from '@app/rpc/protobuf';

import { Logger } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';
import { TenantPlansModel } from '@app/entities/tenant.plans';

export class CreateTenantPlanCommand implements ICommand {
  constructor(public readonly input: CreateTenantPlanRequest) {}
}
@CommandHandler(CreateTenantPlanCommand)
@RpcHandler()
export class CreateTenantPlanHandler
  implements ICommandHandler<CreateTenantPlanCommand, CreateTenantPlanResponse>
{
  constructor(
    private readonly plans: TenantPlansModel,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: CreateTenantPlanCommand,
  ): Promise<CreateTenantPlanResponse> {
    Logger.debug(command.input);
    throw new Error('Not implemented');
  }
}
