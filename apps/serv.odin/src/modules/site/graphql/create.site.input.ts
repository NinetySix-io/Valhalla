import { InputType, PickType } from '@nestjs/graphql';

import { SiteSchema } from '@serv.odin/data.models/sites/schema';

@InputType()
export class CreateSiteInput extends PickType(
  SiteSchema,
  ['name', 'tags'] as const,
  InputType,
) {}
