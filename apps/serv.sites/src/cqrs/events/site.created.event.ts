import { IEvent } from '@nestjs/cqrs';
import { Site } from '@app/protobuf';

export class SiteCreatedEvent implements IEvent {
  constructor(public readonly data: Site) {}
}
