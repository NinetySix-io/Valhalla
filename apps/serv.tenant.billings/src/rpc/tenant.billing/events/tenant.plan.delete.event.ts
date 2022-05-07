import { IEvent } from '@nestjs/cqrs';
import { TenantPlanSchema } from '@serv.tenant.billings/entities/tenant.plans/schema';

export class TenantPlanDeletedEvent implements IEvent {
  constructor(public readonly plan: TenantPlanSchema) {}
}
