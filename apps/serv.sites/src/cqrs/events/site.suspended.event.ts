import { IEvent } from '@nestjs/cqrs';
import { Site } from '@app/protobuf';

export class SiteSuspendedEvent implements IEvent {
  constructor(public readonly data: Site) {}
}
