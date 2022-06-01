import { IEvent } from '@nestjs/cqrs';
import { TenantMember } from '@app/protobuf';

export class TenantMemberCreatedEvent implements IEvent {
  constructor(public readonly member: TenantMember) {}
}
