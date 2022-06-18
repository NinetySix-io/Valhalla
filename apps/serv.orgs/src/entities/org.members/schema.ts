import {
  BaseSchema,
  CaseInsensitiveIndex,
  ExpiryIndex,
  SimpleModel,
} from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { InvitationStatus, OrgRole } from '@app/protobuf';
import { index, prop } from '@typegoose/typegoose';

import mongoose from 'mongoose';

registerEnumType(InvitationStatus, {
  name: 'OrgMemberStatus',
});

registerEnumType(OrgRole, {
  name: 'OrgMemberRole',
});

@ObjectType()
@SimpleModel('organization-members')
@ExpiryIndex({ deletingAt: 1 })
@index({ invitedBy: 1 })
@index({ user: 1, organization: 1 })
@CaseInsensitiveIndex({ status: 1 })
@CaseInsensitiveIndex({ role: 1 })
export class OrgMemberSchema extends BaseSchema {
  @prop()
  @Exclude()
  @Field(() => String, {
    description: 'ID of the account',
  })
  user: mongoose.Types.ObjectId;

  @prop()
  @Exclude()
  @Field(() => String, {
    description: 'ID of the organization',
  })
  organization: mongoose.Types.ObjectId;

  @prop()
  @Exclude()
  @Field(() => String, {
    nullable: true,
    description: 'ID of the account that sent out the invite',
  })
  invitedBy?: mongoose.Types.ObjectId;

  @prop()
  @Expose()
  @Field({ description: 'URL of profile image', nullable: true })
  profileImageUrl?: string;

  @prop()
  @Exclude()
  @Field(() => String, {
    description: 'ID of the account that last updated the member profile',
  })
  updatedBy: mongoose.Types.ObjectId;

  @prop()
  @Expose()
  @Field(() => InvitationStatus, {
    description: 'Status of the organization member',
  })
  status: InvitationStatus;

  @prop({ required: true })
  @Expose()
  @Field(() => OrgRole, {
    description: 'Role of the organization member',
  })
  role: OrgRole;

  @prop()
  @Expose()
  @Field({
    nullable: true,
    description: 'Timestamp in the profile should be deleted',
  })
  deletingAt?: Date;
}
