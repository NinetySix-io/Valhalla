import { IEvent } from '@nestjs/cqrs';
import { PageSection } from '@app/protobuf';

export class SectionDeletedEvent implements IEvent {
  constructor(public readonly data: PageSection) {}
}
