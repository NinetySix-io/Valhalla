import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';
import { UpdatePageRequest, UpdatePageResponse } from '@app/protobuf';

import { PageTransformer } from '@app/entities/pages/transformers';
import { PageUpdatedEvent } from '../events/page.updated.event';
import { PagesModel } from '@app/entities/pages';
import { flattenObject } from '@valhalla/utilities';

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
    const { description, title, isLoneTitle, pageId, requestedUserId } =
      command.request;

    const _id = toObjectId(pageId);
    const updatedBy = toObjectId(requestedUserId);
    const payload = flattenObject(
      { title, description, isLoneTitle, updatedBy },
      '',
      true,
    );

    const page = await this.pages
      .findOneAndUpdate({ _id }, { $set: payload }, { new: true })
      .lean()
      .orFail();

    const serialized = new PageTransformer(page).proto;
    this.eventBus.publish(new PageUpdatedEvent(serialized));
    return { data: serialized };
  }
}
