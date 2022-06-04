import { IEvent } from '@nestjs/cqrs';
import { OrgMember } from '@app/protobuf';

export class OrgMemberCreatedEvent implements IEvent {
  constructor(public readonly member: OrgMember) {}
}
