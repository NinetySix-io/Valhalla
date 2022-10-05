import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, compareId, toObjectId } from '@valhalla/serv.core';
import {
  UpdateSectionIndexRequest,
  UpdateSectionResponse,
} from '@app/protobuf';

import { PageSectionTransformer } from '@app/entities/pages/transformers';
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

    const currentIndex = page.sections.findIndex(compareId(sectionId));
    if (index === -1) {
      throw new Error(`${sectionId} not found!`);
    } else if (index === currentIndex) {
      return {
        data: new PageSectionTransformer(page.sections[index]).proto,
      };
    }

    const section = page.sections[currentIndex];
    section.updatedBy = updatedBy;
    page.sections = page.sections.splice(index, 0, section);
    await page.save();
    const serialized = new PageSectionTransformer(section).proto;
    return { data: serialized };
  }
}
