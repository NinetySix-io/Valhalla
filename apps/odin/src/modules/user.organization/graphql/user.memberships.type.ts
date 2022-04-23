import { Field, ObjectType, PickType } from '@nestjs/graphql';

import { UserMembershipSchema } from '@odin/data.models/user.memberships/schema';

@ObjectType()
export class UserMembershipGroup {
  @Field({ description: 'Name of the group' })
  name: string;

  @Field({ description: 'Avatar of the group' })
  avatar?: string;
}

@ObjectType()
export class UserMembershipType extends PickType(UserMembershipSchema, [
  'groupType',
  'role',
]) {
  @Field({ description: 'Group information' })
  group: UserMembershipGroup;
}
