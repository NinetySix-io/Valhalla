import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  DeleteManyPageElementsRequest,
  DeleteManyPageElementsResponse,
} from '@app/protobuf';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { PageElementTransformer } from '@app/entities/page.elements/transformer';
import { PageElementsDeletedEvent } from '../events/page.elements.deleted.event';
import { PageElementsModel } from '@app/entities/page.elements';

export class DeleteManyPageElementsCommand implements ICommand {
  constructor(public readonly request: DeleteManyPageElementsRequest) {}
}

@CommandHandler(DeleteManyPageElementsCommand)
@RpcHandler()
export class DeletePageElementHandler
  implements
    ICommandHandler<
      DeleteManyPageElementsCommand,
      DeleteManyPageElementsResponse
    >
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly elementsEntity: PageElementsModel,
  ) {}

  async execute(
    command: DeleteManyPageElementsCommand,
  ): Promise<DeleteManyPageElementsResponse> {
    const { elementIdList } = command.request;
    const elementIds = elementIdList.map((id) => toObjectId(id));
    const elements = await this.elementsEntity
      .find()
      .where('_id')
      .in(elementIds)
      .lean();

    await this.elementsEntity.deleteMany().where('_id').in(elementIds);

    const serialized = elements.map(
      (element) => new PageElementTransformer(element).proto,
    );

    this.eventBus.publish(new PageElementsDeletedEvent(serialized));
    return { data: serialized };
  }
}
