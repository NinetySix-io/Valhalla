import { IEvent } from '@nestjs/cqrs';
import { PageElement } from '@app/protobuf';

export class PageElementsUpdatedEvent implements IEvent {
  constructor(public readonly data: PageElement) {}
}
