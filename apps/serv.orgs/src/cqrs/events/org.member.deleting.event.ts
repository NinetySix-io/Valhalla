import { IEvent } from '@nestjs/cqrs';
import { Member } from '@app/protobuf';

export class OrganizationMemberDeletingEvent implements IEvent {
  constructor(public readonly data: Member) {}
}
