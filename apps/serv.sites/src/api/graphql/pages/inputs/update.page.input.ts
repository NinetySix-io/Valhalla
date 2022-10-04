import { InputType, PartialType, PickType } from '@nestjs/graphql';

import { PageSchema } from '@app/entities/pages/schemas';

@InputType()
export class UpdatePageInput extends PartialType(
  PickType(PageSchema, ['title', 'description', 'isLoneTitle'], InputType),
) {}
