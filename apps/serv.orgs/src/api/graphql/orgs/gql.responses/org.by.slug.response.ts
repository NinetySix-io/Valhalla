import { ObjectType, PickType } from '@nestjs/graphql';

import { Organization } from '../gql.types/organization';

@ObjectType()
export class OrganizationBySlugResponse extends PickType(Organization, [
  'id',
  'name',
]) {}
