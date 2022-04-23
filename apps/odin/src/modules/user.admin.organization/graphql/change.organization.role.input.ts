import { Field, InputType } from '@nestjs/graphql';

import { IsEnum } from 'class-validator';
import { IsObjectId } from '@odin/lib/class.validators/is.object.id';
import { UserMembershipRole } from '@odin/data.models/user.memberships/schema';

@InputType()
export class ChangeOrganizationRoleInput {
  @Field({ description: 'User ID' })
  @IsObjectId()
  user: string;

  @Field(() => UserMembershipRole, { description: 'User role within group' })
  @IsEnum(UserMembershipRole)
  role: UserMembershipRole;
}
