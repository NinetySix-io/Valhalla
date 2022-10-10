import { ArgsType, PickType } from '@nestjs/graphql';

import { PageMetaArgs } from './page.meta.args';

@ArgsType()
export class GetPagesBySiteArgs extends PickType(PageMetaArgs, [
  'siteId',
] as const) {}
