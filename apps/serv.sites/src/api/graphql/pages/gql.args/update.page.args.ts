import { ArgsType, Field, PickType } from '@nestjs/graphql';

import { PageMetaArgs } from './page.meta.args';
import { UpdatePageInput } from '../gql.inputs/update.page.input';

@ArgsType()
export class UpdatePageArgs extends PickType(
  PageMetaArgs,
  ['pageId'] as const,
  ArgsType,
) {
  @Field()
  input: UpdatePageInput;
}
