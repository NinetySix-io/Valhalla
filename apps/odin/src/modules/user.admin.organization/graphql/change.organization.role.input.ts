import { Field, InputType, PickType } from '@nestjs/graphql';

import { IsObjectId } from '@odin/lib/class.validators/is.object.id';
import { UserMembershipSchema } from '@odin/data.models/user.memberships/schema';

@InputType()
export class ChangeOrganizationRoleInput extends PickType(
  UserMembershipSchema,
  ['role'] as const,
) {
  @Field({ description: 'User ID' })
  @IsObjectId()
  user: string;
}
