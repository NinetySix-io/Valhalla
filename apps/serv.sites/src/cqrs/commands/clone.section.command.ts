import {
  CloneSectionRequest,
  CloneSectionResponse,
  PageElementPlatform,
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
import { PageElementPlatformSchema } from '@app/entities/page.elements/schemas/platform.schema';
import { PageElementSchema } from '@app/entities/page.elements/schemas';
import { PageElementsModel } from '@app/entities/page.elements';
import { PagesModel } from '@app/entities/pages';

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

  private pickElementPlatform<T extends PageElementPlatform>(
    value: T,
  ): CreatePayload<PageElementPlatformSchema> {
    if (!value) {
      return value;
    }

    return {
      x: value.x,
      y: value.y,
      height: value.height,
      width: value.width,
      isVisible: value.isVisible,
    };
  }

  async execute(command: CloneSectionCommand): Promise<CloneSectionResponse> {
    const pageId = toObjectId(command.request.pageId);
    const sectionId = toObjectId(command.request.sectionId);
    const page = await this.pages.findById(pageId);
    const sectionIndex = page.sections.findIndex(compareId(sectionId));
    if (sectionIndex === -1) {
      throw new Error(`${sectionId} not found!`);
    }

    const section = page.sections[sectionIndex];
    const [newSection, elements] = await Promise.all([
      this.commandBus.execute(
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
      this.pageElements.find({ section: sectionId }).lean(),
    ]);

    await this.pageElements.create(
      elements.map(
        (element): CreatePayload<PageElementSchema> => ({
          updatedBy: toObjectId(command.request.requestedUserId),
          section: toObjectId(newSection.id),
          desktop: this.pickElementPlatform(element.desktop),
          mobile: this.pickElementPlatform(element.mobile),
          tablet: this.pickElementPlatform(element.tablet),
        }),
      ),
    );

    return {
      data: newSection,
    };
  }
}
