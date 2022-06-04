import { IEvent } from '@nestjs/cqrs';
import { Organization } from '@app/protobuf';

export class OrganizationPlanUpdatedEvent implements IEvent {
  constructor(public readonly data: Organization) {}
}
