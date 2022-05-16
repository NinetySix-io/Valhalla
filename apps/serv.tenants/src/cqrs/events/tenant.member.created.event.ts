import { IEvent } from '@nestjs/cqrs';
import { TenantMember } from '@serv.tenants/protobuf/tenants';

export class TenantMemberCreatedEvent implements IEvent {
  constructor(public readonly member: TenantMember) {}
}
