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
    const { pageId, requestedUserId, index = -1 } = command.request;
    const page = toObjectId(pageId);
    const updatedBy = toObjectId(requestedUserId);
    const sectionId = new mongoose.Types.ObjectId();
    const newSection: CreatePayload<PageSectionSchema> = {
      _id: sectionId,
      updatedBy,
      createdBy: updatedBy,
      format: {
        updatedBy,
        rowsCount: 20,
        columnGap: 10,
        rowGap: 10,
      },
    };

    const result = await this.pagesEntity
      .findOneAndUpdate(
        { _id: page },
        { $push: { sections: { $position: index, $each: [newSection] } } },
        { new: true },
      )
      .select({ sections: 1 });

    const section = result.sections.find(compareId(sectionId));
    const serialized = new PageSectionTransformer(section).proto;
    this.eventBus.publish(new SectionCreatedEvent(serialized));
    return { data: serialized };
  }
}
