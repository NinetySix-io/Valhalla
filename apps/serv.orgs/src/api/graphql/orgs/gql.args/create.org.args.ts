import { ArgsType, PickType } from '@nestjs/graphql';

import { Organization } from '../gql.types/organization';

@ArgsType()
export class CreateOrganizationArgs extends PickType(
  Organization,
  ['name', 'plan'] as const,
  ArgsType,
) {}
