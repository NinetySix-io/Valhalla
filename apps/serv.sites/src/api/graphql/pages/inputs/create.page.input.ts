import { InputType, PickType } from '@nestjs/graphql';

import { PageSchema } from '@app/entities/pages/schema';

@InputType()
export class CreatePageInput extends PickType(
  PageSchema,
  ['title'],
  InputType,
) {}
