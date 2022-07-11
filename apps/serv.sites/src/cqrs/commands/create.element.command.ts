import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { CreateElementRequest, CreateElementResponse } from '@app/protobuf';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { ElementCreatedEvent } from '../events/element.created.event';
import { ElementTransformer } from '@app/entities/elements/transformer';
import { ElementsModel } from '@app/entities/elements';

export class CreateElementCommand implements ICommand {
  constructor(public readonly request: CreateElementRequest) {}
}

@CommandHandler(CreateElementCommand)
@RpcHandler()
export class CreateElementHandler
  implements ICommandHandler<CreateElementCommand, CreateElementResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly Elements: ElementsModel,
  ) {}

  async execute(command: CreateElementCommand): Promise<CreateElementResponse> {
    const { owners, requestedUserId, props, type, isRoot, parent } =
      command.request;

    const updatedBy = toObjectId(requestedUserId);
    const result = await this.Elements.create({
      owners,
      parent,
      updatedBy,
      props,
      type,
      isRoot,
    });

    const serialized = ElementTransformer.fromEntity(result).proto;
    this.eventBus.publish(new ElementCreatedEvent(serialized));

    return {
      element: serialized,
    };
  }
}
