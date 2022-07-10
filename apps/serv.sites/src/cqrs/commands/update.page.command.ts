import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  RpcHandler,
  throwEntityNotFound,
  toObjectId,
} from '@valhalla/serv.core';
import { UpdatePageRequest, UpdatePageResponse } from '@app/protobuf';

import { PageTransformer } from '@app/entities/pages/transformer';
import { PageUpdatedEvent } from '../events/page.updated.event';
import { PagesModel } from '@app/entities/pages';

export class UpdatePageCommand implements ICommand {
  constructor(public readonly request: UpdatePageRequest) {}
}

@CommandHandler(UpdatePageCommand)
@RpcHandler()
export class UpdatePageHandler
  implements ICommandHandler<UpdatePageCommand, UpdatePageResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly pages: PagesModel,
  ) {}

  async execute(command: UpdatePageCommand): Promise<UpdatePageResponse> {
    const {
      ownerId,
      description,
      title,
      isLoneTitle,
      siteId,
      pageId,
      requestedUserId,
    } = command.request;

    const _id = toObjectId(pageId);
    const ownBy = toObjectId(ownerId);
    const site = toObjectId(siteId);
    const updatedBy = toObjectId(requestedUserId);
    const page = await this.pages
      .findOneAndUpdate(
        { _id, ownBy, site },
        { $set: { title, description, isLoneTitle, updatedBy } },
        { withoutNil: true, new: true },
      )
      .orFail(throwEntityNotFound);

    const serialized = new PageTransformer(page).proto;
    this.eventBus.publish(new PageUpdatedEvent(serialized));

    return {
      page: serialized,
    };
  }
}
