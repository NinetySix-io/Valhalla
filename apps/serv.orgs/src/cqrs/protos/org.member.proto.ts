import { Alias, AsString, stringify } from '@valhalla/serv.core';
import { InvitationStatus, Member, OrgRole } from '@app/protobuf';

import { Expose } from 'class-transformer';

export class OrgMemberProto implements Member {
  @Expose()
  role: OrgRole;

  @Expose()
  status: InvitationStatus;

  @Expose()
  @Alias('_id', { transform: stringify })
  id: string;

  @Expose()
  @AsString()
  user: string;

  @Expose()
  @AsString()
  organization: string;

  @Expose()
  @AsString()
  invitedBy?: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;

  @Expose()
  @AsString()
  updatedBy: string;

  @Expose()
  profileImageUrl?: string;
}
