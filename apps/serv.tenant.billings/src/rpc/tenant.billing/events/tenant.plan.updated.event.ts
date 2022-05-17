import { IEvent } from '@nestjs/cqrs';
import { TenantPlanSchema } from '@app/entities/tenant.plans/schema';

export class TenantPlanUpdatedEvent implements IEvent {
  constructor(public readonly plan: TenantPlanSchema) {}
}
