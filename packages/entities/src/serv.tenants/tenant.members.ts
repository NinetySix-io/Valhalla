import { BaseEntity } from '../base';


export enum TenantMemberStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Rejected = 'rejected',
}

export enum TenantMemberRole {
  Owner = 'owner',
  Admin = 'admin',
  Developer = 'developer',
  Member = 'member',
  Guess = 'guest',
}

export class TenantMember extends BaseEntity {
  user: string;

  tenant: string;

  invitedBy?: string;

  status: TenantMemberStatus;

  role: TenantMemberRole;
}
