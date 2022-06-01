import { IEvent } from '@nestjs/cqrs';
import { TenantPlanSchema } from '@app/entities/tenant.plans/schema';

export class TenantPlanCreatedEvent implements IEvent {
  constructor(public readonly tenantPlan: TenantPlanSchema) {}
}
