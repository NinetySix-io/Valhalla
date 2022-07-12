import {
  CloneComponentRequest,
  CloneComponentResponse,
  EditStatus,
} from '@app/protobuf';
import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { ComponentCreatedEvent } from '../events/component.created.event';
import { ComponentTransformer } from '@app/entities/components/transformer';
import { ComponentsModel } from '@app/entities/components';

export class CloneComponentCommand implements ICommand {
  constructor(public readonly request: CloneComponentRequest) {}
}

@CommandHandler(CloneComponentCommand)
@RpcHandler()
export class CloneComponentHandler
  implements ICommandHandler<CloneComponentCommand, CloneComponentResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly Components: ComponentsModel,
  ) {}

  async execute(
    command: CloneComponentCommand,
  ): Promise<CloneComponentResponse> {
    const {
      componentId,
      requestedUserId,
      ownerId,
      name,
      status = EditStatus.DRAFT,
    } = command.request;

    const targetId = toObjectId(componentId);
    const createdBy = toObjectId(requestedUserId);
    const ownBy = toObjectId(ownerId);
    const target = await this.Components.findOne({ _id: targetId, ownBy })
      .lean()
      .orFail();

    const component = await this.Components.create({
      name: name || `${target.name}'s Copy`,
      status,
      ownBy,
      createdBy,
      updatedBy: createdBy,
    });

    const serialized = new ComponentTransformer(component).proto;
    const event = new ComponentCreatedEvent(serialized);
    this.eventBus.publish(event);

    return {
      componentId: componentId,
    };
  }
}
