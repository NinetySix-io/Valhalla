import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  CreateManyElementsRequest,
  CreateManyElementsResponse,
} from '@app/protobuf';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { ElementCreatedEvent } from '../events/element.created.event';
import { ElementTransformer } from '@app/entities/elements/transformer';
import { ElementsModel } from '@app/entities/elements';

export class CreateManyElementsCommand implements ICommand {
  constructor(public readonly request: CreateManyElementsRequest) {}
}

@CommandHandler(CreateManyElementsCommand)
@RpcHandler()
export class CreateManyElementsHandler
  implements
    ICommandHandler<CreateManyElementsCommand, CreateManyElementsResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly Elements: ElementsModel,
  ) {}

  async execute(
    command: CreateManyElementsCommand,
  ): Promise<CreateManyElementsResponse> {
    const { elements } = command.request;
    if (elements.length === 0) {
      return {};
    }

    const updatedBy = toObjectId(elements[0].requestedUserId);
    const result = await this.Elements.createMany(
      elements.map((element) => ({
        owners: element.owners,
        parent: element.parent,
        props: element.props,
        type: element.type,
        isRoot: element.isRoot,
        updatedBy,
      })),
    );

    this.eventBus.publishAll(
      result.map(
        (element) =>
          new ElementCreatedEvent(ElementTransformer.fromEntity(element).proto),
      ),
    );

    return {};
  }
}
