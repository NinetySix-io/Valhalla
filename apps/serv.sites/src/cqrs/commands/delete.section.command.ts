import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { DeleteSectionRequest, DeleteSectionResponse } from '@app/protobuf';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { SectionDeletedEvent } from '../events/section.deleted.event';
import { SectionTransformer } from '@app/entities/sections/transformer';
import { SectionUpdatedEvent } from '../events/section.updated.event';
import { SectionsModel } from '@app/entities/sections';
import compact from 'lodash.compact';

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
    private readonly sectionEntity: SectionsModel,
  ) {}

  async execute(command: DeleteSectionCommand): Promise<DeleteSectionResponse> {
    const { requestedUserId, sectionId } = command.request;
    const updatedBy = toObjectId(requestedUserId);
    const section = await this.sectionEntity
      .findOneAndDelete({ _id: toObjectId(sectionId) })
      .lean()
      .orFail();

    const sibling = await this.sectionEntity
      .findOneAndUpdate(
        { head: section._id },
        { $set: { head: section.head, updatedBy } },
        { new: true },
      )
      .lean();

    section.updatedBy = updatedBy;
    section.updatedAt = new Date();
    const serialized = new SectionTransformer(section).proto;
    this.eventBus.publishAll(
      compact([
        new SectionDeletedEvent(serialized),
        sibling &&
          new SectionUpdatedEvent(new SectionTransformer(sibling).proto),
      ]),
    );

    return { data: serialized };
  }
}
