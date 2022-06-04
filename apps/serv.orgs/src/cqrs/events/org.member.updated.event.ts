import { IEvent } from '@nestjs/cqrs';
import { Member } from '@app/protobuf';

export class OrganizationMemberUpdatedEvent implements IEvent {
  constructor(public readonly member: Member) {}
}
