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
  UpdateSectionFormatRequest,
  UpdateSectionResponse,
} from '@app/protobuf';

import { PageSectionProto } from '../transformers/page.section.proto';
import { PagesModel } from '@app/entities/pages';
import { SectionUpdatedEvent } from '../events/section.updated.event';
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
    private readonly pagesEntity: PagesModel,
  ) {}

  async execute(
    command: UpdateSectionFormatCommand,
  ): Promise<UpdateSectionResponse> {
    const { rowGap, rowsCount, columnGap, requestedUserId } = command.request;
    const format = { rowGap, rowsCount, columnGap };

    if (isEmpty(format)) {
      throw new Error('format cannot be empty!');
    }

    const pageId = toObjectId(command.request.pageId);
    const sectionId = toObjectId(command.request.sectionId);
    const updatedBy = toObjectId(requestedUserId);
    const payload = flattenObject(
      { format: format, updatedBy },
      'sections.$[elem].',
      true,
    );

    const page = await this.pagesEntity
      .findOneAndUpdate(
        { _id: pageId },
        { $set: payload },
        {
          new: true,
          arrayFilters: [{ 'elem._id': sectionId }],
        },
      )
      .orFail(() => new Error(`Page not found!`))
      .lean();

    const section = page.sections.find(compareId(sectionId));
    const serialized = Serializer.from(PageSectionProto).serialize(section);
    this.eventBus.publish(new SectionUpdatedEvent(serialized));
    return { data: serialized };
  }
}
