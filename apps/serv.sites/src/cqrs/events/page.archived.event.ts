import { IEvent } from '@nestjs/cqrs';
import { Page } from '@app/protobuf';

export class PageArchivedEvent implements IEvent {
  constructor(public readonly data: Page) {}
}
