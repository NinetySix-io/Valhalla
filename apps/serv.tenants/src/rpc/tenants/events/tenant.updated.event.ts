import { IEvent } from '@nestjs/cqrs';
import { Tenant } from '@app/rpc/protobuf/tenants';

export class tenantUpdatedEvent implements IEvent {
  constructor(public readonly tenant: Tenant) {}
}
