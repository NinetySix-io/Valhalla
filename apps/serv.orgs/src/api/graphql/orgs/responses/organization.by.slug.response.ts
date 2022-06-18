import { Field, ObjectType } from '@nestjs/graphql';

import { OrgMemberSchema } from '@app/entities/org.members/schema';
import { OrganizationSchema } from '@app/entities/organizations/schema';

@ObjectType()
export class OrganizationBySlugResponse {
  @Field({ description: 'Organization' })
  organization: OrganizationSchema;

  @Field({ description: 'Organization Membership' })
  membership: OrgMemberSchema;
}
