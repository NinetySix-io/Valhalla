import { IEvent } from '@nestjs/cqrs';
import { Page } from '@app/protobuf';

export class PageCreatedEvent implements IEvent {
  constructor(public readonly data: Page) {}
}
