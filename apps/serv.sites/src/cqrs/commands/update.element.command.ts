import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';
import { UpdateElementRequest, UpdateElementResponse } from '@app/protobuf';

import { ElementTransformer } from '@app/entities/elements/transformer';
import { ElementUpdatedEvent } from '../events/element.updated.event';
import { ElementsModel } from '@app/entities/elements';

export class UpdateElementCommand implements ICommand {
  constructor(public readonly request: UpdateElementRequest) {}
}

@CommandHandler(UpdateElementCommand)
@RpcHandler()
export class UpdateElementHandler
  implements ICommandHandler<UpdateElementCommand, UpdateElementResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly Elements: ElementsModel,
  ) {}

  async execute(command: UpdateElementCommand): Promise<UpdateElementResponse> {
    const { ownerId, requestedUserId, elementId, parent, props, type } =
      command.request;

    const _id = toObjectId(elementId);
    const ownBy = toObjectId(ownerId);
    const updatedBy = toObjectId(requestedUserId);
    const result = await this.Elements.findOneAndUpdate(
      { _id, ownBy },
      { $set: { parent, props, type, updatedBy } },
      { new: true, withoutNil: true },
    )
      .lean()
      .orFail();

    const serialized = ElementTransformer.fromEntity(result).proto;
    this.eventBus.publish(new ElementUpdatedEvent(serialized));
    return {
      element: serialized,
    };
  }
}
