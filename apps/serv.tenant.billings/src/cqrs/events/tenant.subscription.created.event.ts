import { IEvent } from '@nestjs/cqrs';
import { TenantSubscriptionSchema } from '@app/entities/tenant.subscriptions/schema';

export class TenantSubscriptionCreatedEvent implements IEvent {
  constructor(public readonly subscription: TenantSubscriptionSchema) {}
}
