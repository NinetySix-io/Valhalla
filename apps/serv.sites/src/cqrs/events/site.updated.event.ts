import { IEvent } from '@nestjs/cqrs';
import { Site } from '@app/protobuf';

export class SiteUpdatedEvent implements IEvent {
  constructor(public readonly data: Site) {}
}
