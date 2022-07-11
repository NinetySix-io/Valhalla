import { ObjectType, PickType } from '@nestjs/graphql';

import { ElementSchema } from '@app/entities/elements/schema';

@ObjectType()
export class HierarchicalElementResponse extends PickType(
  ElementSchema,
  ['id', 'type', 'props'] as const,
  ObjectType,
) {
  children?: HierarchicalElementResponse[];
}
