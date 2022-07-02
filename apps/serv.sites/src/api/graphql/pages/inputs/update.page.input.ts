import { InputType, PartialType, PickType } from '@nestjs/graphql';

import { PageSchema } from '@app/entities/pages/schema';

@InputType()
export class UpdatePageInput extends PartialType(
  PickType(PageSchema, ['title', 'description', 'isLoneTitle'], InputType),
) {}
