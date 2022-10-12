import { InputType, PartialType, PickType } from '@nestjs/graphql';

import { Site } from '../gql.types/site';

@InputType()
export class UpdateSiteInput extends PartialType(
  PickType(Site, ['name'] as const, InputType),
) {}
