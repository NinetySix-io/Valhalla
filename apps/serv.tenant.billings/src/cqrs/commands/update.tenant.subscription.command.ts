import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  UpdateTenantSubscriptionRequest,
  UpdateTenantSubscriptionResponse,
} from '@app/protobuf';

import { Logger } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';
import { TenantSubscriptionsModel } from '@app/entities/tenant.subscriptions';

export class UpdateTenantSubscriptionCommand implements ICommand {
  constructor(public readonly input: UpdateTenantSubscriptionRequest) {}
}

@CommandHandler(UpdateTenantSubscriptionCommand)
@RpcHandler()
export class UpdateTenantSubscriptionHandler
  implements
    ICommandHandler<
      UpdateTenantSubscriptionCommand,
      UpdateTenantSubscriptionResponse
    >
{
  constructor(
    private readonly subscriptions: TenantSubscriptionsModel,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: UpdateTenantSubscriptionCommand,
  ): Promise<UpdateTenantSubscriptionResponse> {
    Logger.debug(command);
    throw new Error('Not yet implemented');
  }
}
