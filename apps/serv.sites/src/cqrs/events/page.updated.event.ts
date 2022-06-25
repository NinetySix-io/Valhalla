import { IEvent } from '@nestjs/cqrs';
import { Page } from '@app/protobuf';

export class PageUpdatedEvent implements IEvent {
  constructor(public readonly data: Page) {}
}
