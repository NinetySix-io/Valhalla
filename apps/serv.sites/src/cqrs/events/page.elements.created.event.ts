import { IEvent } from '@nestjs/cqrs';
import { PageElement } from '@app/protobuf';

export class PageElementsCreatedEvent implements IEvent {
  constructor(public readonly data: PageElement[]) {}
}
