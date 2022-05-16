import { IEvent } from '@nestjs/cqrs';
import { TenantPlanSchema } from '@serv.tenant.billings/entities/tenant.plans/schema';

export class TenantPlanCreatedEvent implements IEvent {
  constructor(public readonly tenantPlan: TenantPlanSchema) {}
}
