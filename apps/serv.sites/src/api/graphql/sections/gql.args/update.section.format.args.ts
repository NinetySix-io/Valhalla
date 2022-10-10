import {
  ArgsType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

import { PageSectionFormat } from '../gql.types/page.section.format';
import { SectionMetaArgs } from './section.meta.args';

@ArgsType()
export class UpdateSectionFormatArgs extends IntersectionType(
  SectionMetaArgs,
  PartialType(
    PickType(PageSectionFormat, ['columnGap', 'rowGap', 'rowsCount'], ArgsType),
  ),
) {}
