import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  DeleteTenantSubscriptionRequest,
  DeleteTenantSubscriptionResponse,
} from '@app/rpc/protobuf';

import { Logger } from '@nestjs/common';
import { RpcHandler } from '@valhalla/serv.core';
import { TenantSubscriptionsModel } from '@app/entities/tenant.subscriptions';

export class DeleteTenantSubscriptionCommand implements ICommand {
  constructor(public readonly input: DeleteTenantSubscriptionRequest) {}
}

@CommandHandler(DeleteTenantSubscriptionCommand)
@RpcHandler()
export class DeleteTenantSubscriptionHandler
  implements
    ICommandHandler<
      DeleteTenantSubscriptionCommand,
      DeleteTenantSubscriptionResponse
    >
{
  constructor(
    private readonly subscriptions: TenantSubscriptionsModel,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: DeleteTenantSubscriptionCommand,
  ): Promise<DeleteTenantSubscriptionResponse> {
    Logger.debug(command);
    throw new Error('Not yet implemented');
  }
}
