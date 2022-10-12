import {
  BaseSchema,
  CaseInsensitiveIndex,
  ExpiryIndex,
  SimpleModel,
  mongoose,
  typegoose,
} from '@valhalla/serv.core';
import { InvitationStatus, OrgRole } from '@app/protobuf';

@SimpleModel('organization-members')
@ExpiryIndex({ deletingAt: 1 })
@typegoose.index({ invitedBy: 1 })
@typegoose.index({ user: 1, organization: 1 })
@CaseInsensitiveIndex({ status: 1 })
@CaseInsensitiveIndex({ role: 1 })
export class OrgMemberSchema extends BaseSchema {
  @typegoose.prop()
  user: mongoose.Types.ObjectId;

  @typegoose.prop()
  organization: mongoose.Types.ObjectId;

  @typegoose.prop()
  invitedBy?: mongoose.Types.ObjectId;

  @typegoose.prop()
  profileImageUrl?: string;

  @typegoose.prop()
  updatedBy: mongoose.Types.ObjectId;

  @typegoose.prop()
  status: InvitationStatus;

  @typegoose.prop({ required: true })
  role: OrgRole;

  @typegoose.prop()
  deletingAt?: Date;
}
