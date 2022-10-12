import { InputType, PickType } from '@nestjs/graphql';

import { Page } from '../gql.types/page';

@InputType()
export class CreatePageInput extends PickType(
  Page,
  ['title'] as const,
  InputType,
) {}
