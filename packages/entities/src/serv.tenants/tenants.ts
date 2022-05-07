import { BaseEntity } from '../base';


export enum TenantPlan {
  FREE = 'free',
}

export class Tenant extends BaseEntity {
  name: string;

  slug: string;

  plan: TenantPlan;

  subscription?: string;

  createdBy: string;
}
