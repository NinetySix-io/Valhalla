import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  RpcHandler,
  Serializer,
  compareId,
  toObjectId,
} from '@valhalla/serv.core';
import {
  UpdateSectionIndexRequest,
  UpdateSectionResponse,
} from '@app/protobuf';

import { PageSectionProto } from '../protos/page.section.proto';
import { PagesModel } from '@app/entities/pages';

export class UpdateSectionIndexCommand implements ICommand {
  constructor(public readonly request: UpdateSectionIndexRequest) {}
}

@CommandHandler(UpdateSectionIndexCommand)
@RpcHandler()
export class UpdateSectionIndexHandler
  implements ICommandHandler<UpdateSectionIndexCommand, UpdateSectionResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly pagesEntity: PagesModel,
  ) {}

  async execute(
    command: UpdateSectionIndexCommand,
  ): Promise<UpdateSectionResponse> {
    const { index, requestedUserId } = command.request;
    const sectionId = toObjectId(command.request.sectionId);
    const pageId = toObjectId(command.request.pageId);
    const updatedBy = toObjectId(requestedUserId);
    const page = await this.pagesEntity
      .findById(pageId)
      .orFail(() => new Error(`${pageId} not found!`));

    const serializer = Serializer.from(PageSectionProto);
    const currentIndex = page.sections.findIndex(compareId(sectionId));
    if (index === -1) {
      throw new Error(`${sectionId} not found!`);
    } else if (index === currentIndex) {
      return { data: serializer.serialize(page.sections[index]) };
    }

    const section = page.sections[currentIndex];
    section.updatedBy = updatedBy;

    //remove
    page.sections.splice(currentIndex, 1);
    //reinsert
    page.sections.splice(index, 0, section);

    await page.save();
    const serialized = serializer.serialize(section);
    return { data: serialized };
  }
}
