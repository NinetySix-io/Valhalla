import { ObjectType, PickType } from '@nestjs/graphql';

import { PageSchema } from '@app/entities/pages/schema';

@ObjectType()
export class PageUpdatedResponse extends PickType(
  PageSchema,
  ['id', 'status'],
  ObjectType,
) {}
