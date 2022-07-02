import { InputType, PickType } from '@nestjs/graphql';

import { SiteSchema } from '@app/entities/sites/schema';

@InputType()
export class CreateSiteInput extends PickType(
  SiteSchema,
  ['name'],
  InputType,
) {}
