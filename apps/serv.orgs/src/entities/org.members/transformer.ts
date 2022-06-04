import { Member as MemberProto } from '@app/protobuf';
import { OrgMemberSchema } from './schema';

export class OrgMemberTransformer {
  private entity: OrgMemberSchema;

  constructor(entity: OrgMemberSchema) {
    this.entity = entity;
  }

  get proto(): MemberProto {
    return {
      id: this.entity.id,
      organization: this.entity.organization.toHexString(),
      user: this.entity.user.toHexString(),
      invitedBy: this.entity.invitedBy?.toHexString(),
      role: this.entity.role,
      status: this.entity.status,
      createdAt: this.entity.createdAt.toString(),
      updatedAt: this.entity.updatedAt.toString(),
      updatedBy: this.entity.updatedBy.toString(),
      profileImageUrl: this.entity.profileImageUrl,
    };
  }
}
