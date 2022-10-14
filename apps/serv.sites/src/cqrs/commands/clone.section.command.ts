import {
  CloneSectionRequest,
  CloneSectionResponse,
  CreateSectionResponse,
} from '@app/protobuf';
import {
  CommandBus,
  CommandHandler,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  CreatePayload,
  RpcHandler,
  compareId,
  toObjectId,
} from '@valhalla/serv.core';

import { CreateSectionCommand } from './create.section.command';
import { PageElementSchema } from '@app/entities/page.elements/schemas';
import { PageElementsModel } from '@app/entities/page.elements';
import { PagesModel } from '@app/entities/pages';
import { isEmpty } from 'lodash';

export class CloneSectionCommand implements ICommand {
  constructor(public readonly request: CloneSectionRequest) {}
}

@CommandHandler(CloneSectionCommand)
@RpcHandler()
export class CloneSectionHandler
  implements ICommandHandler<CloneSectionCommand, CloneSectionResponse>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly pages: PagesModel,
    private readonly pageElements: PageElementsModel,
  ) {}

  async execute(command: CloneSectionCommand): Promise<CloneSectionResponse> {
    const pageId = toObjectId(command.request.pageId);
    const sectionId = toObjectId(command.request.sectionId);
    const userId = toObjectId(command.request.requestedUserId);
    const page = await this.pages.findById(pageId);
    const sectionIndex = page.sections.findIndex(compareId(sectionId));
    if (sectionIndex === -1) {
      throw new Error(`${sectionId} not found!`);
    }

    const section = page.sections[sectionIndex];
    const [elements, newSection] = await Promise.all([
      this.pageElements.find({ group: sectionId }).select({ _id: 0 }).lean(),
      this.commandBus.execute<CreateSectionCommand, CreateSectionResponse>(
        new CreateSectionCommand({
          pageId: command.request.pageId,
          requestedUserId: command.request.requestedUserId,
          index: sectionIndex + 1,
          format: {
            rowGap: section.format.rowGap,
            columnGap: section.format.columnGap,
            rowsCount: section.format.rowsCount,
          },
        }),
      ),
    ]);

    if (!isEmpty(elements)) {
      await this.pageElements.create(
        elements.map(
          (element): CreatePayload<PageElementSchema> => ({
            ...element,
            group: toObjectId(newSection.data.id),
            updatedBy: userId,
            createdBy: userId,
          }),
        ),
      );
    }

    return {
      data: newSection.data,
    };
  }
}
