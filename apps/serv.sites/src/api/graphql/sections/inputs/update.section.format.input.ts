import { InputType, PartialType, PickType } from '@nestjs/graphql';

import { PageSectionFormatSchema } from '@app/entities/pages/schemas';

@InputType()
export class UpdateSectionFormatInput extends PartialType(
  PickType(
    PageSectionFormatSchema,
    ['columnGap', 'rowGap', 'rowsCount'],
    InputType,
  ),
) {}
