import { DocumentType } from '@typegoose/typegoose';
import { Member as MemberProto } from '@app/protobuf';
import { OrgMemberSchema } from './schema';

export class OrgMemberTransformer extends OrgMemberSchema {
  constructor(entity: DocumentType<OrgMemberSchema>) {
    super();
    Object.assign(this, entity.toObject({ virtuals: false }));
  }

  get proto(): MemberProto {
    return {
      id: this.id,
      organization: this.organization.toHexString(),
      user: this.user.toHexString(),
      invitedBy: this.invitedBy?.toHexString(),
      role: this.role,
      status: this.status,
      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
      updatedBy: this.updatedBy.toString(),
      profileImageUrl: this.profileImageUrl,
    };
  }
}
