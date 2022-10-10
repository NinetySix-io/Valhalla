import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, Serializer, toObjectId } from '@valhalla/serv.core';
import {
  TextElement,
  UpdatePageElementRequest,
  UpdatePageElementResponse,
} from '@app/protobuf';

import { PageElementProto } from '../transformers/page.element.proto';
import { PageElementSchema } from '@app/entities/page.elements/schemas';
import { PageElementTextSchema } from '@app/entities/page.elements/variants/text.variant';
import { PageElementsModel } from '@app/entities/page.elements';
import { PageElementsUpdatedEvent } from '../events/page.elements.updated.event';
import { UpdateQuery } from 'mongoose';
import { flattenObject } from '@valhalla/utilities';
import { isEmpty } from 'lodash';
import isNil from 'lodash.isnil';
import { merge } from 'merge-anything';
import omitBy from 'lodash.omitby';

export class UpdatePageElementCommand implements ICommand {
  constructor(public readonly request: UpdatePageElementRequest) {}
}

@CommandHandler(UpdatePageElementCommand)
@RpcHandler()
export class UpdatePageElementHandler
  implements
    ICommandHandler<UpdatePageElementCommand, UpdatePageElementResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly pageElements: PageElementsModel,
  ) {}

  private getTextUpdatePayload(
    input: TextElement,
  ): UpdateQuery<PageElementTextSchema> {
    return { $set: omitBy(input, isNil) };
  }

  private getCommonUpdatePayload(
    request: UpdatePageElementRequest,
  ): UpdateQuery<PageElementSchema> {
    const { desktop, mobile, tablet } = request;
    return {
      $set: flattenObject(
        {
          desktop,
          mobile,
          tablet,
        },
        '',
        true,
      ),
    };
  }

  private getUpdatePayload(request: UpdatePageElementRequest) {
    if (request.type.$case === 'text') {
      return this.getTextUpdatePayload(request.type.text);
    }

    return null;
  }

  async execute(
    command: UpdatePageElementCommand,
  ): Promise<UpdatePageElementResponse> {
    const updatedBy = toObjectId(command.request.requestedUserId);
    const elementId = toObjectId(command.request.elementId);
    const payload = merge(
      this.getCommonUpdatePayload(command.request),
      this.getUpdatePayload(command.request),
    );

    if (isEmpty(payload)) {
      throw new Error('Nothing to update!');
    }

    const finalSignOff = merge(payload, { $set: { updatedBy } });
    const element = await this.pageElements
      .findByIdAndUpdate(elementId, finalSignOff, { new: true })
      .lean();

    const serialized = Serializer.from(PageElementProto).serialize(element);
    this.eventBus.publish(new PageElementsUpdatedEvent([serialized]));
    return { data: serialized };
  }
}
