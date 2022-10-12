import { ArgsType, Field, PickType } from '@nestjs/graphql';

import { SiteMetaArgs } from './site.meta.args';
import { UpdateSiteInput } from '../gql.inputs/update.site.input';

@ArgsType()
export class UpdateSiteArgs extends PickType(
  SiteMetaArgs,
  ['siteId'] as const,
  ArgsType,
) {
  @Field()
  input: UpdateSiteInput;
}
