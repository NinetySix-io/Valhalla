import { Alias, AsString, stringify } from '@valhalla/serv.core';
import { OrgPlan, OrgStatus, Organization } from '@app/protobuf';

import { Expose } from 'class-transformer';

export class OrgProto implements Organization {
  @Expose()
  @Alias('_id', { transform: stringify })
  id: string;

  @Expose()
  slug: string;

  @Expose()
  name: string;

  @Expose()
  @AsString()
  createdBy: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  @AsString()
  updateBy: string;

  @Expose()
  updatedAt?: Date;

  @Expose()
  logoUrl?: string;

  @Expose()
  status: OrgStatus;

  @Expose()
  plan: OrgPlan;
}
