import { InputType, ObjectType, PickType } from '@nestjs/graphql';

import { PageSchema } from '@app/entities/pages/schema';

@InputType()
export class CreatePageInput extends PickType(
  PageSchema,
  ['title'],
  ObjectType,
) {}
