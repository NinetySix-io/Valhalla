import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { DeleteElementRequest, DeleteElementResponse } from '@app/protobuf';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { ElementDeletedEvent } from '../events/element.deleted.event';
import { ElementsModel } from '@app/entities/elements';

export class DeleteElementCommand implements ICommand {
  constructor(public readonly request: DeleteElementRequest) {}
}

@CommandHandler(DeleteElementCommand)
@RpcHandler()
export class DeleteElementHandler
  implements ICommandHandler<DeleteElementCommand, DeleteElementResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly Elements: ElementsModel,
  ) {}

  async execute(command: DeleteElementCommand): Promise<DeleteElementResponse> {
    const { elementId, owners, requestedUserId } = command.request;
    const _id = toObjectId(elementId);
    await this.Elements.findOneAndDelete({ _id, owners }).lean().orFail();

    this.eventBus.publish(
      new ElementDeletedEvent({
        elementId,
        deletedBy: requestedUserId,
      }),
    );

    return {};
  }
}
