import { IEvent } from '@nestjs/cqrs';
import { TenantMember } from '@app/rpc/protobuf';

export class TenantMemberDeletedEvent implements IEvent {
  constructor(public readonly member: TenantMember) {}
}
