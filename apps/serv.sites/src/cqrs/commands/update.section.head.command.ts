import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';
import { UpdateSectionHeadRequest, UpdateSectionResponse } from '@app/protobuf';

import { SectionTransformer } from '@app/entities/sections/transformer';
import { SectionUpdatedEvent } from '../events/section.updated.event';
import { SectionsModel } from '@app/entities/sections';
import compact from 'lodash.compact';

export class UpdateSectionHeadCommand implements ICommand {
  constructor(public readonly request: UpdateSectionHeadRequest) {}
}

@CommandHandler(UpdateSectionHeadCommand)
@RpcHandler()
export class UpdateSectionIndexHandler
  implements ICommandHandler<UpdateSectionHeadCommand, UpdateSectionResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly sectionEntity: SectionsModel,
  ) {}

  async execute(
    command: UpdateSectionHeadCommand,
  ): Promise<UpdateSectionResponse> {
    const { head, sectionId, requestedUserId } = command.request;
    const headId = toObjectId(head);
    const updatedBy = toObjectId(requestedUserId);
    const section = await this.sectionEntity
      .findOneAndUpdate(
        { _id: toObjectId(sectionId) },
        { head: headId, updatedBy: updatedBy },
        { new: true },
      )
      .lean()
      .orFail();

    const sibling = await this.sectionEntity
      .findOneAndUpdate(
        {
          head: headId,
          _id: { $ne: section._id },
        },
        { $set: { updatedBy, head: section._id } },
        { new: true },
      )
      .lean();

    const serialized = new SectionTransformer(section).proto;
    this.eventBus.publishAll(
      compact([
        new SectionUpdatedEvent(serialized),
        sibling &&
          new SectionUpdatedEvent(new SectionTransformer(sibling).proto),
      ]),
    );

    return { data: serialized };
  }
}
