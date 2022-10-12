import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { DeletePageRequest, DeletePageResponse } from '@app/protobuf';
import {
  RpcHandler,
  Serializer,
  getObjectIdString,
  toObjectId,
} from '@valhalla/serv.core';

import { DeletePageElementListByGroupCommand } from './delete.page.element.list.by.group.command';
import { PageDeletedEventEvent } from '../events/page.deleted.event';
import { PageProto } from '../transformers/page.proto';
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
    private readonly commandBus: CommandBus,
    private readonly pages: PagesModel,
  ) {}

  async execute(command: DeletePageCommand): Promise<DeletePageResponse> {
    const { requestedUserId, pageId } = command.request;
    const _id = toObjectId(pageId);
    const deletedPage = await this.pages
      .findOneAndDelete({ _id })
      .lean()
      .orFail();

    deletedPage.sections.forEach((section) =>
      this.commandBus.execute(
        new DeletePageElementListByGroupCommand({
          groupId: getObjectIdString(section),
          requestedUserId,
        }),
      ),
    );

    const serialized = Serializer.from(PageProto).serialize(deletedPage);
    this.eventBus.publish(
      new PageDeletedEventEvent({
        ...serialized,
        requestedUserId,
      }),
    );

    return { data: serialized };
  }
}
