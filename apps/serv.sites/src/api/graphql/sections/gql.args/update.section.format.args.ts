import { ArgsType, Field, PickType } from '@nestjs/graphql';

import { SectionMetaArgs } from './section.meta.args';
import { UpdateSectionFormatInput } from '../gql.inputs/update.section.input';

@ArgsType()
export class UpdateSectionFormatArgs extends PickType(
  SectionMetaArgs,
  ['sectionId', 'pageId'] as const,
  ArgsType,
) {
  @Field()
  input: UpdateSectionFormatInput;
}
