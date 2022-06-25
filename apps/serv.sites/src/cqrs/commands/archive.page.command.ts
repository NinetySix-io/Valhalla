import {
  ArchivePageRequest,
  ArchivePageResponse,
  PageStatus,
} from '@app/protobuf';
import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { PageArchivedEvent } from '../events/page.archived.event';
import { PageTransformer } from '@app/entities/pages/transformer';
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
    const { organizationId, siteId, requestedUserId } = command.request;
    const organization = toObjectId(organizationId);
    const site = toObjectId(siteId);
    const updatedBy = toObjectId(requestedUserId);
    const status = PageStatus.ARCHIVED;
    const page = await this.pages
      .findOneAndUpdate(
        { organization, site },
        { $set: { status, updatedBy } },
        { new: true },
      )
      .orFail(() => new Error('Page not found!'));

    const serialized = new PageTransformer(page).proto;
    this.eventBus.publish(new PageArchivedEvent(serialized));

    return {
      page: serialized,
    };
  }
}
