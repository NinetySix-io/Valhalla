import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsDate, IsEnum } from 'class-validator';
import { Ref, index, mongoose, prop } from '@typegoose/typegoose';

import { BaseSchema } from '@odin/data.models/_base/schema';
import { IsObjectId } from '@odin/lib/class.validators/is.object.id';
import { UserSchema } from '../users/schema';
import { expiryIndex } from '../_base/decorators/expiry.index';
import { simpleModel } from '../_base/decorators/simple.model';

export enum UserMembershipRole {
  OWNER = 'OWNER',
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
}

export enum UserMembershipGroupType {
  ORGANIZATION = 'ORGANIZATION',
}

registerEnumType(UserMembershipRole, {
  name: 'UserMembershipRole',
  description: 'User Membership Role',
});

registerEnumType(UserMembershipGroupType, {
  name: 'UserMembershipGroupType',
  description: 'User Memberships Group Type',
});

@ObjectType()
@simpleModel('user.memberships')
@expiryIndex({ expiresAt: 1 })
@index({ user: 1, group: 1 }, { unique: true })
@index({ user: 1, groupType: 1 })
@index({ groupType: 1 })
export class UserMembershipSchema extends BaseSchema {
  @Exclude()
  @IsObjectId()
  @prop({ ref: () => UserSchema })
  user: Ref<UserSchema>;

  @Field(() => String, { description: 'Group that the user belongs to' })
  @Expose()
  @prop()
  group: mongoose.Types.ObjectId;

  @Expose()
  @Field(() => UserMembershipGroupType, {
    description: 'Group type for the membership',
  })
  @IsEnum(UserMembershipGroupType)
  @prop()
  groupType: UserMembershipGroupType;

  @Expose()
  @Field(() => UserMembershipRole, { description: 'User role within group' })
  @IsEnum(UserMembershipRole)
  @prop()
  role: UserMembershipRole;

  @Field({ nullable: true })
  @Expose()
  @IsDate()
  @prop()
  expiresAt?: Date;
}
