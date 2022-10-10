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
import { RpcHandler, Serializer, toObjectId } from '@valhalla/serv.core';

import { FilterQuery } from 'mongoose';
import { PageElementProto } from '../transformers/page.element.proto';
import { PageElementSchema } from '@app/entities/page.elements/schemas';
import { PageElementsDeletedEvent } from '../events/page.elements.deleted.event';
import { PageElementsModel } from '@app/entities/page.elements';

export class DeleteManyPageElementsCommand implements ICommand {
  constructor(public readonly request: DeleteManyPageElementsRequest) {}
}

@CommandHandler(DeleteManyPageElementsCommand)
@RpcHandler()
export class DeleteManyPageElementsHandler
  implements
    ICommandHandler<
      DeleteManyPageElementsCommand,
      DeleteManyPageElementsResponse
    >
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly pageElements: PageElementsModel,
  ) {}

  async execute(
    command: DeleteManyPageElementsCommand,
  ): Promise<DeleteManyPageElementsResponse> {
    const { elementIdList } = command.request;
    const elementIds = elementIdList.map((id) => toObjectId(id));
    const filter: FilterQuery<PageElementSchema> = {
      _id: {
        $in: elementIds,
      },
    };

    const elements = await this.pageElements.find(filter).lean();
    await this.pageElements.deleteMany(filter);
    const serialized = Serializer.from(PageElementProto).serialize(elements);
    this.eventBus.publish(new PageElementsDeletedEvent(serialized));
    return { data: serialized };
  }
}
