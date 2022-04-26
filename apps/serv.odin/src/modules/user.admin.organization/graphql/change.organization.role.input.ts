import { Field, InputType } from '@nestjs/graphql';

import { IsEnum } from 'class-validator';
import { IsObjectId } from '@serv.odin/lib/class.validators/is.object.id';
import { UserMembershipRole } from '@serv.odin/data.models/user.memberships/schema';

@InputType()
export class ChangeOrganizationRoleInput {
  @Field({ description: 'User ID' })
  @IsObjectId()
  user: string;

  // TODO: When using `PickType` on an enum, it does not transfer
  @Field(() => UserMembershipRole, { description: 'User role within group' })
  @IsEnum(UserMembershipRole)
  role: UserMembershipRole;
}