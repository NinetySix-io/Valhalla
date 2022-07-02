import { InputType, ObjectType, PickType } from '@nestjs/graphql';

import { SiteSchema } from '@app/entities/sites/schema';

@InputType()
export class CreateSiteInput extends PickType(
  SiteSchema,
  ['name'],
  ObjectType,
) {}
