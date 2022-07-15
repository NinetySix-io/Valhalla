import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  CreateTextRequest,
  CreatedElementResponse,
  ElementType,
} from '@app/protobuf';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { ElementCreatedEvent } from '../events/element.created.event';
import { TextElementsModel } from '@app/entities/elements/text';

export class CreateTextCommand implements ICommand {
  constructor(public readonly request: CreateTextRequest) {}
}

@CommandHandler(CreateTextCommand)
@RpcHandler()
export class CreateTextHandler
  implements ICommandHandler<CreateTextCommand, CreatedElementResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly TextElements: TextElementsModel,
  ) {}

  async execute(command: CreateTextCommand): Promise<CreatedElementResponse> {
    const { requestedUserId, owners, style, text, parent } = command.request;
    const createdBy = toObjectId(requestedUserId);
    const element = await this.TextElements.create({
      type: ElementType.Text,
      updatedBy: createdBy,
      owners,
      text,
      parent,
      style,
    });

    this.eventBus.publish(
      new ElementCreatedEvent({
        elementId: element.id,
        type: element.type,
      }),
    );

    return {
      elementId: element.id,
    };
  }
}
