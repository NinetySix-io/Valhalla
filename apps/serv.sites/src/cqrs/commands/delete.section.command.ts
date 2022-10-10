import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { DeleteSectionRequest, DeleteSectionResponse } from '@app/protobuf';
import {
  RpcHandler,
  Serializer,
  compareId,
  toObjectId,
} from '@valhalla/serv.core';

import { DeletePageElementListByGroupCommand } from './delete.page.element.list.by.group.command';
import { PageSectionProto } from '../transformers/page.section.proto';
import { PagesModel } from '@app/entities/pages';
import { SectionDeletedEvent } from '../events/section.deleted.event';

export class DeleteSectionCommand implements ICommand {
  constructor(public readonly request: DeleteSectionRequest) {}
}

@CommandHandler(DeleteSectionCommand)
@RpcHandler()
export class DeleteSectionHandler
  implements ICommandHandler<DeleteSectionCommand, DeleteSectionResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
    private readonly pagesEntity: PagesModel,
  ) {}

  async execute(command: DeleteSectionCommand): Promise<DeleteSectionResponse> {
    const { requestedUserId } = command.request;
    const updatedBy = toObjectId(requestedUserId);
    const pageId = toObjectId(command.request.pageId);
    const sectionId = toObjectId(command.request.sectionId);
    const page = await this.pagesEntity
      .findOneAndUpdate(
        { _id: pageId },
        { $pull: { sections: { _id: sectionId } } },
      )
      .lean()
      .orFail(() => new Error(`${pageId} not found!`));

    const section = page.sections.find(compareId(sectionId));
    const serialized = Serializer.from(PageSectionProto).serialize({
      ...section,
      updatedBy,
      updatedAt: new Date(),
    });

    //TODO: this should be trigger from event bus somewhere
    this.commandBus.execute(
      new DeletePageElementListByGroupCommand({
        groupId: section.id,
        requestedUserId,
      }),
    );

    this.eventBus.publish(new SectionDeletedEvent(serialized));
    return { data: serialized };
  }
}
