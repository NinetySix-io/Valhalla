import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  CreateTenantSubscriptionRequest,
  CreateTenantSubscriptionResponse,
} from '@app/rpc/protobuf/tenant.billing';

import { Logger } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';
import { TenantSubscriptionsModel } from '@app/entities/tenant.subscriptions';

export class CreateTenantSubscriptionCommand implements ICommand {
  constructor(public readonly input: CreateTenantSubscriptionRequest) {}
}

@CommandHandler(CreateTenantSubscriptionCommand)
@RpcHandler()
export class CreateTenantSubscriptionHandler
  implements
    ICommandHandler<
      CreateTenantSubscriptionCommand,
      CreateTenantSubscriptionResponse
    >
{
  constructor(
    private readonly subscriptions: TenantSubscriptionsModel,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: CreateTenantSubscriptionCommand,
  ): Promise<CreateTenantSubscriptionResponse> {
    Logger.debug(command.input);
    throw new Error('Not yet implemented');
  }
}
