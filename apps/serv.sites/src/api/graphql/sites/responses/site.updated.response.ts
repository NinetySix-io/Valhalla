import { ObjectType, PickType } from '@nestjs/graphql';

import { SiteSchema } from '@app/entities/sites/schema';

@ObjectType()
export class SiteUpdatedResponse extends PickType(
  SiteSchema,
  ['id', 'status'],
  ObjectType,
) {}
