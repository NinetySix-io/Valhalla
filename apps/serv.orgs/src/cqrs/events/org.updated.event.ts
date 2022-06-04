import { IEvent } from '@nestjs/cqrs';
import { Organization } from '@app/protobuf';

export class tenantUpdatedEvent implements IEvent {
  constructor(public readonly organization: Organization) {}
}
