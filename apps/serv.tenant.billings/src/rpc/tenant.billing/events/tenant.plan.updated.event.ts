import { IEvent } from '@nestjs/cqrs';
import { TenantPlanSchema } from '@serv.tenant.billings/entities/tenant.plans/schema';

export class TenantPlanUpdatedEvent implements IEvent {
  constructor(public readonly plan: TenantPlanSchema) {}
}
