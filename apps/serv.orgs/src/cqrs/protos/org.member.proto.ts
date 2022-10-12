import { InvitationStatus, Member, OrgRole } from '@app/protobuf';

export class OrgMemberProto implements Member {
  role: OrgRole;
  status: InvitationStatus;
  id: string;
  user: string;
  organization: string;
  invitedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  updatedBy: string;
  profileImageUrl?: string;
}
