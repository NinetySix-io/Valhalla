import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

import { Organization } from '../gql.types/organization';

@InputType()
export class CreateOrganizationInput extends IntersectionType(
  PickType(Organization, ['name'] as const, InputType),
  PartialType(PickType(Organization, ['plan'] as const, InputType)),
) {}
