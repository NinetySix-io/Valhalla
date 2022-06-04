import {
  BaseSchema,
  CaseInsensitiveIndex,
  ExpiryIndex,
  SimpleModel,
} from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { index, prop } from '@typegoose/typegoose';

import mongoose from 'mongoose';

export enum OrgMemberStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Rejected = 'rejected',
  Suspended = 'suspended',
}

export enum OrgMemberRole {
  Owner = 'owner',
  Admin = 'admin',
  Developer = 'developer',
  Member = 'member',
  Guess = 'guest',
}

registerEnumType(OrgMemberStatus, {
  name: 'OrgMemberStatus',
});

registerEnumType(OrgMemberRole, {
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
    description: 'ID of the account that sent out the invite',
  })
  invitedBy: mongoose.Types.ObjectId;

  @prop()
  @Expose()
  @Field({ description: 'URL of profile image' })
  profileImageUrl?: string;

  @prop()
  @Exclude()
  @Field(() => String, {
    description: 'ID of the account that last updated the member profile',
  })
  updatedBy: mongoose.Types.ObjectId;

  @prop()
  @Expose()
  @Field(() => OrgMemberStatus, {
    description: 'Status of the organization member',
  })
  status: OrgMemberStatus;

  @prop()
  @Expose()
  @Field(() => OrgMemberRole, {
    description: 'Role of the organization member',
  })
  role: OrgMemberRole;

  @prop()
  @Expose()
  @Field({
    description: 'Timestamp in the profile should be deleted',
  })
  deletingAt?: Date;
}
