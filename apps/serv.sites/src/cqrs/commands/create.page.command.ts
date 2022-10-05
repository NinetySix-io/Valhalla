import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  CreatePageRequest,
  CreatePageResponse,
  EditStatus,
} from '@app/protobuf';
import { CreatePayload, RpcHandler, toObjectId } from '@valhalla/serv.core';

import { PageCreatedEvent } from '../events/page.created.event';
import { PageSchema } from '@app/entities/pages/schemas';
import { PageTransformer } from '@app/entities/pages/transformers';
import { PagesModel } from '@app/entities/pages';

export class CreatePageCommand implements ICommand {
  constructor(public readonly request: CreatePageRequest) {}
}

@CommandHandler(CreatePageCommand)
@RpcHandler()
export class CreatePageHandler
  implements ICommandHandler<CreatePageCommand, CreatePageResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly pages: PagesModel,
  ) {}

  async execute(command: CreatePageCommand): Promise<CreatePageResponse> {
    const { requestedUserId, siteId, title = 'Untitled' } = command.request;
    const createdBy = toObjectId(requestedUserId);
    const updatedBy = createdBy;
    const site = toObjectId(siteId);
    const status = EditStatus.DRAFT;
    const payload: CreatePayload<PageSchema> = {
      createdBy,
      updatedBy,
      site,
      title,
      status,
      sections: [],
    };

    const page = await this.pages.create(payload);
    const serialized = new PageTransformer(page).proto;
    this.eventBus.publish(new PageCreatedEvent(serialized));
    return { data: serialized };
  }
}
