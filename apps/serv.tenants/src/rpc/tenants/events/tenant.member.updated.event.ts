import { IEvent } from '@nestjs/cqrs';
import { TenantMember } from '@app/rpc/protobuf/tenants';

export class TenantMemberUpdatedEvent implements IEvent {
  constructor(public readonly member: TenantMember) {}
}
