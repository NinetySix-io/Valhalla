import { IEvent } from '@nestjs/cqrs';
import { Organization } from '@app/protobuf';

export class OrgDeletedEvent implements IEvent {
  constructor(public readonly organization: Organization) {}
}
