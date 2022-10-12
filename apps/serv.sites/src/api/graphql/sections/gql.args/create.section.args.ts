import { ArgsType, Field, PickType } from '@nestjs/graphql';

import { Min } from 'class-validator';
import { NonNegativeIntResolver } from 'graphql-scalars';
import { SectionMetaArgs } from './section.meta.args';

@ArgsType()
export class CreateSectionArgs extends PickType(SectionMetaArgs, [
  'pageId',
] as const) {
  @Field(() => NonNegativeIntResolver, {
    description: 'Position',
    nullable: true,
  })
  @Min(0)
  index?: number;
}
