import { ArgsType, Field, PickType } from '@nestjs/graphql';

import { CreatePageInput } from '../gql.inputs/create.page.input';
import { PageMetaArgs } from './page.meta.args';

@ArgsType()
export class CreatePageArgs extends PickType(
  PageMetaArgs,
  ['siteId'] as const,
  ArgsType,
) {
  @Field(() => CreatePageInput)
  input: CreatePageInput;
}
