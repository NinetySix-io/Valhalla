import { IEvent } from '@nestjs/cqrs';
import { Tenant } from '@serv.tenants/protobuf/tenants';

export class TenantCreatedEvent implements IEvent {
  constructor(public readonly tenant: Tenant) {}
}
