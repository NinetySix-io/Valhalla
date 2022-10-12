import { InputType, PartialType, PickType } from '@nestjs/graphql';

import { PageSectionFormat } from '../gql.types/page.section.format';

@InputType()
export class UpdateSectionFormatInput extends PartialType(
  PickType(PageSectionFormat, ['columnGap', 'rowGap', 'rowsCount'], InputType),
) {}
