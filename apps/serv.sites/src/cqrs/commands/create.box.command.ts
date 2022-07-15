import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  CreateBoxRequest,
  CreatedElementResponse,
  ElementType,
  HTMLType,
} from '@app/protobuf';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { BoxElementsModel } from '@app/entities/elements/boxes';
import { ElementCreatedEvent } from '../events/element.created.event';

export class CreateBoxCommand implements ICommand {
  constructor(public readonly request: CreateBoxRequest) {}
}

@CommandHandler(CreateBoxCommand)
@RpcHandler()
export class CreateBoxHandler
  implements ICommandHandler<CreateBoxCommand, CreatedElementResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly BoxElements: BoxElementsModel,
  ) {}

  async execute(command: CreateBoxCommand): Promise<CreatedElementResponse> {
    const {
      owners,
      parent,
      style,
      requestedUserId,
      after,
      htmlType = HTMLType.div,
    } = command.request;

    const createdBy = toObjectId(requestedUserId);
    const element = await this.BoxElements.create({
      type: ElementType.Box,
      updatedBy: createdBy,
      parent,
      owners,
      style,
      htmlType,
      after: after ? toObjectId(after) : undefined,
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
