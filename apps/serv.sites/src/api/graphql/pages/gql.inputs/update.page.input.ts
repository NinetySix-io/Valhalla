import { InputType, PartialType, PickType } from '@nestjs/graphql';

import { Page } from '../gql.types/page';

@InputType()
export class UpdatePageInput extends PartialType(
  PickType(Page, ['title', 'description', 'isLoneTitle'] as const, InputType),
) {}
