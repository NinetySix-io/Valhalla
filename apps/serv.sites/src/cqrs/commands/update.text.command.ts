import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';
import { UpdateTextRequest, UpdatedElementResponse } from '@app/protobuf';

import { ElementUpdatedEvent } from '../events/element.updated.event';
import { TextElementsModel } from '@app/entities/elements/text';

export class UpdateTextCommand implements ICommand {
  constructor(public readonly request: UpdateTextRequest) {}
}

@CommandHandler(UpdateTextCommand)
@RpcHandler()
export class UpdateTextHandler
  implements ICommandHandler<UpdateTextCommand, UpdatedElementResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly TextElements: TextElementsModel,
  ) {}

  async execute(command: UpdateTextCommand): Promise<UpdatedElementResponse> {
    const { requestedUserId, owners, style, text, elementId } = command.request;
    const _id = toObjectId(elementId);
    const updatedBy = toObjectId(requestedUserId);
    const element = await this.TextElements.findOneAndUpdate(
      { _id, owners },
      { $set: { updatedBy, style, text } },
      { new: true, withoutNil: true },
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
