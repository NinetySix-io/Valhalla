import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';
import { UpdateBoxRequest, UpdatedElementResponse } from '@app/protobuf';

import { BoxElementsModel } from '@app/entities/elements/boxes';
import { ElementUpdatedEvent } from '../events/element.updated.event';

export class UpdateBoxCommand implements ICommand {
  constructor(public readonly request: UpdateBoxRequest) {}
}

@CommandHandler(UpdateBoxCommand)
@RpcHandler()
export class UpdateBoxHandler
  implements ICommandHandler<UpdateBoxCommand, UpdatedElementResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly BoxElements: BoxElementsModel,
  ) {}

  async execute(command: UpdateBoxCommand): Promise<UpdatedElementResponse> {
    const { owners, elementId, style, requestedUserId, htmlType } =
      command.request;

    const _id = toObjectId(elementId);
    const updatedBy = toObjectId(requestedUserId);
    const element = await this.BoxElements.findOneAndUpdate(
      { _id, owners },
      { $set: { style, updatedBy, htmlType } },
      { withoutNil: true, new: true },
    );

    if (element) {
      this.eventBus.publish(
        new ElementUpdatedEvent({
          elementId: element.id,
          type: element.type,
        }),
      );
    }

    return {};
  }
}
