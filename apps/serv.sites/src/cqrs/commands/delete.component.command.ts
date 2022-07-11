import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { DeleteComponentRequest, DeleteComponentResponse } from '@app/protobuf';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { ComponentDeletedEvent } from '../events/component.deleted.event';
import { ComponentTransformer } from '@app/entities/components/transformer';
import { ComponentsModel } from '@app/entities/components';

export class DeleteComponentCommand implements ICommand {
  constructor(public readonly request: DeleteComponentRequest) {}
}

@CommandHandler(DeleteComponentCommand)
@RpcHandler()
export class DeleteComponentHandler
  implements ICommandHandler<DeleteComponentCommand, DeleteComponentResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly Components: ComponentsModel,
  ) {}

  async execute(
    command: DeleteComponentCommand,
  ): Promise<DeleteComponentResponse> {
    const { requestedUserId, componentId, ownerId } = command.request;
    const _id = toObjectId(componentId);
    const ownBy = toObjectId(ownerId);
    const result = await this.Components.findOneAndDelete({
      _id,
      ownBy,
    })
      .lean()
      .orFail();

    const serialized = new ComponentTransformer(result).proto;
    this.eventBus.publish(
      new ComponentDeletedEvent({
        ...serialized,
        deletedBy: requestedUserId,
      }),
    );

    return {};
  }
}
