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
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { PageCreatedEvent } from '../events/page.created.event';
import { PageTransformer } from '@app/entities/pages/transformer';
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
    const {
      requestedUserId,
      ownerId,
      siteId,
      title = 'Untitled',
    } = command.request;

    const createdBy = toObjectId(requestedUserId);
    const updatedBy = createdBy;
    const ownBy = toObjectId(ownerId);
    const site = toObjectId(siteId);
    const status = EditStatus.DRAFT;
    const page = await this.pages.create({
      createdBy,
      updatedBy,
      site,
      title,
      ownBy,
      status,
    });

    const serialized = new PageTransformer(page).proto;
    this.eventBus.publish(new PageCreatedEvent(serialized));
    return { data: serialized };
  }
}
