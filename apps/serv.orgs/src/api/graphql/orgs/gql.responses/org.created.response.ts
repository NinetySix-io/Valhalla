import { ObjectType, PickType } from '@nestjs/graphql';

import { Organization } from '../gql.types/organization';

@ObjectType()
export class OrgCreatedResponse extends PickType(Organization, [
  'id',
] as const) {}
