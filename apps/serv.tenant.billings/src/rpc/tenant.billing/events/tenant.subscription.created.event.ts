import { IEvent } from '@nestjs/cqrs';
import { TenantSubscriptionSchema } from '@serv.tenant.billings/entities/tenant.subscriptions/schema';

export class TenantSubscriptionCreatedEvent implements IEvent {
  constructor(public readonly subscription: TenantSubscriptionSchema) {}
}
