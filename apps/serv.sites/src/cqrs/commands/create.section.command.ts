import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { CreateSectionRequest, CreateSectionResponse } from '@app/protobuf';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { SectionCreatedEvent } from '../events/section.created.event';
import { SectionTransformer } from '@app/entities/sections/transformer';
import { SectionUpdatedEvent } from '../events/section.updated.event';
import { SectionsModel } from '@app/entities/sections';
import compact from 'lodash.compact';

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
    private readonly sectionsEntity: SectionsModel,
  ) {}

  async execute(command: CreateSectionCommand): Promise<CreateSectionResponse> {
    const { pageId, requestedUserId, head } = command.request;
    const page = toObjectId(pageId);
    const updatedBy = toObjectId(requestedUserId);
    const headSection = await this.sectionsEntity
      .findById(head)
      .orFail(() => new Error(`${head} does not exists!`));

    const section = await this.sectionsEntity.create({
      page,
      head: headSection.id,
      updatedBy,
      format: {
        updatedBy,
        rowsCount: 20,
        columnGap: 10,
        rowGap: 10,
      },
    });

    const sibling = await this.sectionsEntity
      .findOneAndUpdate(
        { page, head: headSection.id, _id: { $ne: section._id } },
        { $set: { head: section.id, updatedBy } },
        { new: true },
      )
      .lean();

    const serialized = new SectionTransformer(section).proto;
    this.eventBus.publishAll(
      compact([
        new SectionCreatedEvent(serialized),
        sibling &&
          new SectionUpdatedEvent(new SectionTransformer(sibling).proto),
      ]),
    );

    return { data: serialized };
  }
}
