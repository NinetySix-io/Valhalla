import { IEvent } from '@nestjs/cqrs';
import { Tenant } from '@serv.tenants/protobuf/tenants';

export class tenantUpdatedEvent implements IEvent {
  constructor(public readonly tenant: Tenant) {}
}
