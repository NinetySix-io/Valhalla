import { IEvent } from '@nestjs/cqrs';
import { PageSection } from '@app/protobuf';

export class SectionCreatedEvent implements IEvent {
  constructor(public readonly data: PageSection) {}
}
