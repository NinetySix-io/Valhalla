import { ArgsType, Field } from '@nestjs/graphql';

import { Min } from 'class-validator';
import { SectionMetaArgs } from './section.meta.args';

@ArgsType()
export class UpdateSectionIndexArgs extends SectionMetaArgs {
  @Field()
  @Min(0)
  index: number;
}
