import { IEvent } from '@nestjs/cqrs';
import { TenantSubscriptionSchema } from '@app/entities/tenant.subscriptions/schema';

export class TenantSubscriptionDeleteEvent implements IEvent {
  constructor(public readonly subscription: TenantSubscriptionSchema) {}
}
