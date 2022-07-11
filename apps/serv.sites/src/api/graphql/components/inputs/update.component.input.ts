import { InputType, PartialType, PickType } from '@nestjs/graphql';

import { ComponentSchema } from '@app/entities/components/schema';

@InputType()
export class UpdateComponentInput extends PartialType(
  PickType(ComponentSchema, ['name'] as const, InputType),
) {}
