import {
  ArchivePageRequest,
  ArchivePageResponse,
  EditStatus,
} from '@app/protobuf';
import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { PageArchivedEvent } from '../events/page.archived.event';
import { PageTransformer } from '@app/entities/pages/transformers';
import { PagesModel } from '@app/entities/pages';

export class ArchivePageCommand implements ICommand {
  constructor(public readonly request: ArchivePageRequest) {}
}

@CommandHandler(ArchivePageCommand)
@RpcHandler()
export class ArchivePageHandler
  implements ICommandHandler<ArchivePageCommand, ArchivePageResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly pages: PagesModel,
  ) {}

  async execute(command: ArchivePageCommand): Promise<ArchivePageResponse> {
    const { requestedUserId } = command.request;
    const pageId = toObjectId(command.request.pageId);
    const updatedBy = toObjectId(requestedUserId);
    const status = EditStatus.ARCHIVED;
    const page = await this.pages
      .findOneAndUpdate(
        { _id: pageId },
        { $set: { status, updatedBy } },
        { new: true },
      )
      .lean()
      .orFail();

    const serialized = new PageTransformer(page).proto;
    this.eventBus.publish(new PageArchivedEvent(serialized));
    return { data: serialized };
  }
}
