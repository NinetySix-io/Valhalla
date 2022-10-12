import { ArgsType, Field } from '@nestjs/graphql';

import { Min } from 'class-validator';
import { NonNegativeIntResolver } from 'graphql-scalars';
import { SectionMetaArgs } from './section.meta.args';

@ArgsType()
export class UpdateSectionIndexArgs extends SectionMetaArgs {
  @Field(() => NonNegativeIntResolver)
  @Min(0)
  index: number;
}
