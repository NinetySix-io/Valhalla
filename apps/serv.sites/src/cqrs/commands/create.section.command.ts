import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  CreatePayload,
  RpcHandler,
  compareId,
  toObjectId,
} from '@valhalla/serv.core';
import { CreateSectionRequest, CreateSectionResponse } from '@app/protobuf';

import { PageSectionSchema } from '@app/entities/pages/schemas';
import { PageSectionTransformer } from '@app/entities/pages/transformers';
import { PagesModel } from '@app/entities/pages';
import { SectionCreatedEvent } from '../events/section.created.event';
import mongoose from 'mongoose';

export class CreateSectionCommand implements ICommand {
  constructor(public readonly request: CreateSectionRequest) {}
}

@CommandHandler(CreateSectionCommand)
@RpcHandler()
export class CreateSectionHandler
  implements ICommandHandler<CreateSectionCommand, CreateSectionResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly pagesEntity: PagesModel,
  ) {}

  async execute(command: CreateSectionCommand): Promise<CreateSectionResponse> {
    const index = command.request.index ?? -1;
    const pageId = toObjectId(command.request.pageId);
    const updatedBy = toObjectId(command.request.requestedUserId);
    const sectionId = new mongoose.Types.ObjectId();
    const format = command.request.format ?? {};

    const newSection: CreatePayload<PageSectionSchema> = {
      _id: sectionId,
      updatedBy,
      createdBy: updatedBy,
      format: {
        rowsCount: 20,
        columnGap: 10,
        rowGap: 10,
        ...format,
        updatedBy,
      },
    };

    const page = await this.pagesEntity
      .findOneAndUpdate(
        { _id: pageId },
        {
          $push: {
            sections: {
              $position: index,
              $each: [newSection],
            },
          },
        },
        { new: true },
      )
      .orFail(() => new Error(`${pageId} does not exists!`));

    const section = page.sections.find(compareId(sectionId));
    const serialized = new PageSectionTransformer(section).proto;
    this.eventBus.publish(new SectionCreatedEvent(serialized));
    return { data: serialized };
  }
}
