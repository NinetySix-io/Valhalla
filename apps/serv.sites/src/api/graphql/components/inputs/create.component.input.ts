import { InputType, PickType } from '@nestjs/graphql';

import { ComponentSchema } from '@app/entities/components/schema';

@InputType()
export class CreateComponentInput extends PickType(
  ComponentSchema,
  ['name'] as const,
  InputType,
) {}
