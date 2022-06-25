import { IEvent } from '@nestjs/cqrs';
import { Site } from '@app/protobuf';

export class SiteDeployedEvent implements IEvent {
  constructor(public readonly data: Site) {}
}
