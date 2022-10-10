import {
  ArgsType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

import { Page } from '../gql.types/page';
import { PageMetaArgs } from './page.meta.args';

@ArgsType()
export class UpdatePageArgs extends IntersectionType(
  PickType(PageMetaArgs, ['pageId'] as const, ArgsType),
  PartialType(
    PickType(Page, ['title', 'description', 'isLoneTitle'] as const, ArgsType),
  ),
) {}
