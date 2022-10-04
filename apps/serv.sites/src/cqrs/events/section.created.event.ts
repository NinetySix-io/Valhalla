import { IEvent } from '@nestjs/cqrs';
import { Section } from '@app/protobuf';

export class SectionCreatedEvent implements IEvent {
  constructor(public readonly data: Section) {}
}
