import { ArgsType, IntersectionType, PickType } from '@nestjs/graphql';

import { Page } from '../gql.types/page';
import { PageMetaArgs } from './page.meta.args';

@ArgsType()
export class CreatePageArgs extends IntersectionType(
  PickType(PageMetaArgs, ['siteId'] as const, ArgsType),
  PickType(Page, ['title'] as const, ArgsType),
) {}
