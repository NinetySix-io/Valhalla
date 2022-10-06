import {
  AddPageElementRequest,
  AddPageElementResponse,
  PrimitiveElementType,
  TextElement,
} from '@app/protobuf';
import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { CreatePayload, RpcHandler, toObjectId } from '@valhalla/serv.core';

import { PageElementSchema } from '@app/entities/page.elements/schemas';
import { PageElementTextSchema } from '@app/entities/page.elements/variants/text.variant';
import { PageElementTransformer } from '@app/entities/page.elements/transformer';
import { PageElementsCreatedEvent } from '../events/page.elements.created.event';
import { PageElementsModel } from '@app/entities/page.elements';

export class AddPageElementCommand implements ICommand {
  constructor(public readonly request: AddPageElementRequest) {}
}

@CommandHandler(AddPageElementCommand)
@RpcHandler()
export class AddPageElementHandler
  implements ICommandHandler<AddPageElementCommand, AddPageElementResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly pageElements: PageElementsModel,
  ) {}

  private getTextPayload(
    input: TextElement,
  ): Pick<PageElementTextSchema, 'type' | 'json' | 'html'> {
    return {
      type: PrimitiveElementType.TEXT,
      json: input.json,
      html: input.html,
    };
  }

  private getPayload(request: AddPageElementRequest) {
    const { requestedUserId, tablet, type, desktop, mobile } = request;
    const createdBy = toObjectId(requestedUserId);
    const group = toObjectId(request.groupId);
    const basePayload: CreatePayload<Omit<PageElementSchema, 'type'>> = {
      createdBy,
      desktop,
      mobile,
      tablet,
      group,
      updatedBy: createdBy,
    };

    if (type.$case === 'text') {
      return {
        ...basePayload,
        ...this.getTextPayload(type.text),
      };
    }

    throw new Error('Invalid element type');
  }

  async execute(
    command: AddPageElementCommand,
  ): Promise<AddPageElementResponse> {
    const payload = this.getPayload(command.request);
    const element = await this.pageElements.create(payload);
    const serialized = new PageElementTransformer(element).proto;
    this.eventBus.publish(new PageElementsCreatedEvent([serialized]));
    return { data: serialized };
  }
}
