import { OrgPlan, OrgStatus, Organization } from '@app/protobuf';

export class OrgProto implements Organization {
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
