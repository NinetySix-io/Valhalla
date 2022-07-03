import { Member as MemberProto } from '@app/protobuf';
import { OrgMemberSchema } from './schema';
import { typegoose } from '@valhalla/serv.core';

export class OrgMemberTransformer extends OrgMemberSchema {
  constructor(entity: typegoose.DocumentType<OrgMemberSchema>) {
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
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      updatedBy: this.updatedBy.toHexString(),
      profileImageUrl: this.profileImageUrl,
    };
  }
}
