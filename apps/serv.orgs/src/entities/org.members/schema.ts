import {
  BaseSchema,
  CaseInsensitiveIndex,
  ExpiryIndex,
  SimpleModel,
  mongoose,
  typegoose,
} from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { InvitationStatus, OrgRole } from '@app/protobuf';

registerEnumType(InvitationStatus, {
  name: 'OrgMemberStatus',
});

registerEnumType(OrgRole, {
  name: 'OrgMemberRole',
});

@ObjectType()
@SimpleModel('organization-members')
@ExpiryIndex({ deletingAt: 1 })
@typegoose.index({ invitedBy: 1 })
@typegoose.index({ user: 1, organization: 1 })
@CaseInsensitiveIndex({ status: 1 })
@CaseInsensitiveIndex({ role: 1 })
export class OrgMemberSchema extends BaseSchema {
  @typegoose.prop()
  @Exclude()
  @Field(() => String, {
    description: 'ID of the account',
  })
  user: mongoose.Types.ObjectId;

  @typegoose.prop()
  @Exclude()
  @Field(() => String, {
    description: 'ID of the organization',
  })
  organization: mongoose.Types.ObjectId;

  @typegoose.prop()
  @Exclude()
  @Field(() => String, {
    nullable: true,
    description: 'ID of the account that sent out the invite',
  })
  invitedBy?: mongoose.Types.ObjectId;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'URL of profile image', nullable: true })
  profileImageUrl?: string;

  @typegoose.prop()
  @Exclude()
  @Field(() => String, {
    description: 'ID of the account that last updated the member profile',
  })
  updatedBy: mongoose.Types.ObjectId;

  @typegoose.prop()
  @Expose()
  @Field(() => InvitationStatus, {
    description: 'Status of the organization member',
  })
  status: InvitationStatus;

  @typegoose.prop({ required: true })
  @Expose()
  @Field(() => OrgRole, {
    description: 'Role of the organization member',
  })
  role: OrgRole;

  @typegoose.prop()
  @Expose()
  @Field({
    nullable: true,
    description: 'Timestamp in the profile should be deleted',
  })
  deletingAt?: Date;
}
