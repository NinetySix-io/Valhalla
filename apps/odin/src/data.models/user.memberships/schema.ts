import { Ref, index, mongoose, prop } from '@typegoose/typegoose';

import { BaseSchema } from '@odin/data.models/_base/schema';
import { UserSchema } from '../users/schema';
import { expiryIndex } from '../_base/decorators/expiry.index';
import { registerEnumType } from '@nestjs/graphql';
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
  @prop({ ref: () => UserSchema })
  user: Ref<UserSchema>;

  @prop()
  group: mongoose.Types.ObjectId;

  @prop({ enum: UserMembershipGroupType })
  groupType: UserMembershipGroupType;

  @prop({ enum: UserMembershipRole })
  role: UserMembershipRole;

  @prop()
  expiresAt?: Date;
}
