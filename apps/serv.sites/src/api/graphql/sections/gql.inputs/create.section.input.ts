import { Field, InputType } from '@nestjs/graphql';

import { Min } from 'class-validator';
import { NonNegativeIntResolver } from 'graphql-scalars';

@InputType()
export class CreateSectionInput {
  @Field(() => NonNegativeIntResolver, {
    description: 'Position',
    nullable: true,
  })
  @Min(0)
  index?: number;
}
