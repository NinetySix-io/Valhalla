import { IEvent } from '@nestjs/cqrs';
import { Organization } from '@app/protobuf';

export class OrganizationCreatedEvent implements IEvent {
  constructor(public readonly organization: Organization) {}
}
