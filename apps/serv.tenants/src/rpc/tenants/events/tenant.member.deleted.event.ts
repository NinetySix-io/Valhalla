import { IEvent } from '@nestjs/cqrs';
import { TenantMember } from '@app/protobuf/tenants';

export class TenantMemberDeletedEvent implements IEvent {
  constructor(public readonly member: TenantMember) {}
}