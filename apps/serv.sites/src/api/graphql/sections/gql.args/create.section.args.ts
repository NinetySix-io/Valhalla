import { ArgsType, Field, PickType } from '@nestjs/graphql';

import { CreateSectionInput } from '../gql.inputs/create.section.input';
import { SectionMetaArgs } from './section.meta.args';

@ArgsType()
export class CreateSectionArgs extends PickType(SectionMetaArgs, [
  'pageId',
] as const) {
  @Field({ nullable: true })
  input: CreateSectionInput;
}
