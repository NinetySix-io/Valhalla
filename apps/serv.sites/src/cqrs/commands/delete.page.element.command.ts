import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  DeletePageElementRequest,
  DeletePageElementResponse,
} from '@app/protobuf';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { PageElementTransformer } from '@app/entities/page.elements/transformer';
import { PageElementsDeletedEvent } from '../events/page.elements.deleted.event';
import { PageElementsModel } from '@app/entities/page.elements';

export class DeletePageElementCommand implements ICommand {
  constructor(public readonly request: DeletePageElementRequest) {}
}

@CommandHandler(DeletePageElementCommand)
@RpcHandler()
export class DeletePageElementHandler
  implements
    ICommandHandler<DeletePageElementCommand, DeletePageElementResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly pageElements: PageElementsModel,
  ) {}

  async execute(
    command: DeletePageElementCommand,
  ): Promise<DeletePageElementResponse> {
    const deletedBy = toObjectId(command.request.requestedUserId);
    const elementId = toObjectId(command.request.elementId);
    const element = await this.pageElements
      .findByIdAndDelete()
      .where('_id', elementId)
      .orFail(() => new Error('element not found!'))
      .lean();

    element.updatedBy = deletedBy;
    element.updatedAt = new Date();
    const serialized = new PageElementTransformer(element).proto;
    this.eventBus.publish(new PageElementsDeletedEvent([serialized]));

    return {
      data: serialized,
    };
  }
}
