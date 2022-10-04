import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';
import {
  UpdateSectionFormatRequest,
  UpdateSectionResponse,
} from '@app/protobuf';

import { SectionTransformer } from '@app/entities/sections/transformer';
import { SectionUpdatedEvent } from '../events/section.updated.event';
import { SectionsModel } from '@app/entities/sections';
import { flattenObject } from '@valhalla/utilities';
import isEmpty from 'lodash.isempty';

export class UpdateSectionFormatCommand implements ICommand {
  constructor(public readonly request: UpdateSectionFormatRequest) {}
}

@CommandHandler(UpdateSectionFormatCommand)
@RpcHandler()
export class UpdateSectionIndexHandler
  implements ICommandHandler<UpdateSectionFormatCommand, UpdateSectionResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly sectionEntity: SectionsModel,
  ) {}

  async execute(
    command: UpdateSectionFormatCommand,
  ): Promise<UpdateSectionResponse> {
    const { format, requestedUserId, sectionId } = command.request;
    if (isEmpty(format)) {
      throw new Error('format cannot be empty!');
    }

    const updatedBy = toObjectId(requestedUserId);
    const payload = flattenObject({ format, updatedBy }, null, true);
    const section = await this.sectionEntity.findOneAndUpdate(
      { _id: toObjectId(sectionId) },
      { $set: payload },
      { new: true },
    );

    const serialized = new SectionTransformer(section).proto;
    this.eventBus.publish(new SectionUpdatedEvent(serialized));
    return { data: serialized };
  }
}
