import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  RpcHandler,
  throwEntityNotFound,
  toObjectId,
} from '@valhalla/serv.core';
import { UpdateComponentRequest, UpdateComponentResponse } from '@app/protobuf';

import { ComponentTransformer } from '@app/entities/components/transformer';
import { ComponentUpdatedEvent } from '../events/component.updated.event';
import { ComponentsModel } from '@app/entities/components';

export class UpdateComponentCommand implements ICommand {
  constructor(public readonly request: UpdateComponentRequest) {}
}

@CommandHandler(UpdateComponentCommand)
@RpcHandler()
export class UpdateComponentHandler
  implements ICommandHandler<UpdateComponentCommand, UpdateComponentResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly Components: ComponentsModel,
  ) {}

  async execute(
    command: UpdateComponentCommand,
  ): Promise<UpdateComponentResponse> {
    const {
      componentId,
      ownerIdList,
      requestedUserId,
      name,
      elements,
      status,
    } = command.request;

    const _id = toObjectId(componentId);
    const updatedBy = toObjectId(requestedUserId);
    const result = await this.Components.findOneAndUpdate(
      {
        _id,
        owners: ownerIdList,
      },
      {
        $set: {
          updatedBy,
          name,
          status,
          elements,
        },
      },
      {
        withoutNil: true,
        new: true,
        projection: {
          elements: 0,
        },
      },
    ).orFail(throwEntityNotFound);

    const serialized = new ComponentTransformer(result).proto;
    const event = new ComponentUpdatedEvent(serialized);
    this.eventBus.publish(event);
    return {};
  }
}
