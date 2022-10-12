import { OrgPlan, OrgStatus, Organization } from '@app/protobuf';

import { Expose } from 'class-transformer';

export class OrgProto implements Organization {
  @Expose({ name: '_id' })
  id: string;
  slug: string;
  name: string;
  createdBy: string;
  createdAt?: Date;
  updateBy: string;
  updatedAt?: Date;
  logoUrl?: string;
  status: OrgStatus;
  plan: OrgPlan;
}
