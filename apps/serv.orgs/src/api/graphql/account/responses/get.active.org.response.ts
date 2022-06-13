import { Field, ObjectType } from '@nestjs/graphql';

import { OrganizationSchema } from '@app/entities/organizations/schema';

@ObjectType()
export class GetAccountActiveOrgResponse {
  @Field({
    description: 'Active Organization',
    nullable: true,
  })
  organization?: Omit<
    OrganizationSchema,
    | '_id'
    | 'plan'
    | 'updatedBy'
    | 'status'
    | 'createdBy'
    | 'createdAt'
    | 'updatedAt'
  >;
}
