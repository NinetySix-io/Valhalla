import { InputType, PartialType, PickType } from '@nestjs/graphql';

import { SiteSchema } from '@app/entities/sites/schema';

@InputType()
export class UpdateSiteInput extends PartialType(
  PickType(SiteSchema, ['name'], InputType),
) {}
