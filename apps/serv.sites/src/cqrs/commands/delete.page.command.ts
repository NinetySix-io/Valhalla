import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { DeletePageRequest, DeletePageResponse } from '@app/protobuf';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { PageDeletedEventEvent } from '../events/page.deleted.event';
import { PageTransformer } from '@app/entities/pages/transformer';
import { PagesModel } from '@app/entities/pages';

export class DeletePageCommand implements ICommand {
  constructor(public readonly request: DeletePageRequest) {}
}

@CommandHandler(DeletePageCommand)
@RpcHandler()
export class DeletePageHandler
  implements ICommandHandler<DeletePageCommand, DeletePageResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly pages: PagesModel,
  ) {}

  async execute(command: DeletePageCommand): Promise<DeletePageResponse> {
    const { ownerId, requestedUserId, siteId, pageId } = command.request;
    const page = toObjectId(pageId);
    const ownBy = toObjectId(ownerId);
    const site = toObjectId(siteId);
    const deletedPage = await this.pages
      .findOneAndDelete({
        _id: page,
        ownBy,
        site,
      })
      .orFail();

    const serialized = new PageTransformer(deletedPage).proto;
    this.eventBus.publish(
      new PageDeletedEventEvent({
        ...serialized,
        requestedUserId,
      }),
    );

    return {
      page: serialized,
    };
  }
}
