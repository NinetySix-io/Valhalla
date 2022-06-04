import { IEvent } from '@nestjs/cqrs';
import { Organization } from '@app/protobuf';

export class OrgCreatedEvent implements IEvent {
  constructor(public readonly organization: Organization) {}
}
