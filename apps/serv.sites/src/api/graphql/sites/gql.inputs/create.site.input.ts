import { InputType, PickType } from '@nestjs/graphql';

import { Site } from '../gql.types/site';

@InputType()
export class CreateSiteInput extends PickType(
  Site,
  ['name'] as const,
  InputType,
) {}
