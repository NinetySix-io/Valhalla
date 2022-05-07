import { IEvent } from '@nestjs/cqrs';
import { Tenant } from '@serv.tenants/protobuf/tenants';

export class TenantDeletedEvent implements IEvent {
  constructor(public readonly tenant: Tenant) {}
}
