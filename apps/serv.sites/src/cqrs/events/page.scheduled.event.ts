import { IEvent } from '@nestjs/cqrs';
import { Page } from '@app/protobuf';

export class PageScheduledEvent implements IEvent {
  constructor(public readonly data: Page) {}
}
