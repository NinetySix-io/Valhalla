import { IEvent } from '@nestjs/cqrs';
import { Section } from '@app/protobuf';

export class SectionUpdatedEvent implements IEvent {
  constructor(public readonly data: Section) {}
}
