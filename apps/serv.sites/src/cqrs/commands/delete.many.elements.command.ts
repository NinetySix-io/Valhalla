import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  DeleteManyElementsRequest,
  DeleteManyElementsResponse,
} from '@app/protobuf';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { ElementDeletedEvent } from '../events/element.deleted.event';
import { ElementsModel } from '@app/entities/elements';

export class DeleteManyElementsCommand implements ICommand {
  constructor(public readonly request: DeleteManyElementsRequest) {}
}

@CommandHandler(DeleteManyElementsCommand)
@RpcHandler()
export class DeleteManyElementsHandler
  implements
    ICommandHandler<DeleteManyElementsCommand, DeleteManyElementsResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly Elements: ElementsModel,
  ) {}

  async execute(
    command: DeleteManyElementsCommand,
  ): Promise<DeleteManyElementsResponse> {
    const { elementIdList, requestedUserId, owners } = command.request;
    await this.Elements.deleteMany({
      owners,
      _id: {
        $in: elementIdList.map((elementId) => toObjectId(elementId)),
      },
    });

    this.eventBus.publishAll(
      elementIdList.map(
        (elementId) =>
          new ElementDeletedEvent({
            elementId,
            deletedBy: requestedUserId,
          }),
      ),
    );

    return {};
  }
}
