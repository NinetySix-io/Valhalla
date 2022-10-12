import { InvitationStatus, Member, OrgRole } from '@app/protobuf';

import { Expose } from 'class-transformer';

export class OrgMemberProto implements Member {
  role: OrgRole;
  status: InvitationStatus;

  @Expose({ name: '_id' })
  id: string;
  user: string;
  organization: string;
  invitedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  updatedBy: string;
  profileImageUrl?: string;
}
