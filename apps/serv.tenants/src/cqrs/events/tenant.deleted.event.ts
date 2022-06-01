import { IEvent } from '@nestjs/cqrs';
import { Tenant } from '@app/protobuf';

export class TenantDeletedEvent implements IEvent {
  constructor(public readonly tenant: Tenant) {}
}
