import { IEvent } from '@nestjs/cqrs';
import { Organization } from '@app/protobuf';

export class OrganizationRestoredEvent implements IEvent {
  constructor(public readonly data: Organization) {}
}
