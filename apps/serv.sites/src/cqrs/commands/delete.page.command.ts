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
    const { requestedUserId, pageId } = command.request;
    const _id = toObjectId(pageId);
    const deletedPage = await this.pages
      .findOneAndDelete({ _id })
      .lean()
      .orFail();

    const serialized = new PageTransformer(deletedPage).proto;
    this.eventBus.publish(
      new PageDeletedEventEvent({
        ...serialized,
        requestedUserId,
      }),
    );

    return { data: serialized };
  }
}
