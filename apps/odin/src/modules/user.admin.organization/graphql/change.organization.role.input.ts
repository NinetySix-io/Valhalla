import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { IsObjectId } from '@odin/lib/class.validators/is.object.id';
import { UserMembershipSchema } from '@odin/data.models/user.memberships/schema';

@InputType()
export class ChangeOrganizationRoleInput extends PickType(
  UserMembershipSchema,
  ['role'],
  ObjectType,
) {
  @Field({ description: 'User ID' })
  @IsObjectId()
  user: string;
}
