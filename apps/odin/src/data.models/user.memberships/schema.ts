import { Exclude, Expose } from 'class-transformer';
import { Field, registerEnumType } from '@nestjs/graphql';
import { Ref, index, mongoose, prop } from '@typegoose/typegoose';

import { BaseSchema } from '@odin/data.models/_base/schema';
import { UserSchema } from '../users/schema';
import { expiryIndex } from '../_base/decorators/expiry.index';
import { simpleModel } from '../_base/decorators/simple.model';

export enum UserMembershipRole {
  OWNER = 'OWNER',
  MEMBER = 'MEMBER',
}

export enum UserMembershipGroupType {
  ORGANIZATION = 'ORGANIZATION',
}

registerEnumType(UserMembershipRole, {
  name: 'UserMembershipRole',
  description: 'User Membership Group Role',
});

registerEnumType(UserMembershipGroupType, {
  name: 'UserMembershipGroupType',
  description: 'User Membership Group Type',
});

@simpleModel('user.memberships')
@expiryIndex({ expiresAt: 1 })
@index({ user: 1, group: 1 }, { unique: true })
@index({ user: 1, groupType: 1 })
@index({ groupType: 1 })
export class UserMembershipSchema extends BaseSchema {
  @Exclude()
  @prop({ ref: () => UserSchema })
  user: Ref<UserSchema>;

  @Field({ description: 'Group that the user belongs to' })
  @Expose()
  @prop()
  group: mongoose.Types.ObjectId;

  @Expose()
  @Field({ description: 'Group type for the membership' })
  @prop({ enum: UserMembershipGroupType })
  groupType: UserMembershipGroupType;

  @Field({ description: 'User role within group' })
  @Expose()
  @prop({ enum: UserMembershipRole })
  role: UserMembershipRole;

  @Field({ nullable: true })
  @Expose()
  @prop()
  expiresAt?: Date;
}
