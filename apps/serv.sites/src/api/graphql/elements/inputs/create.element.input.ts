import {
  InputType,
  IntersectionType,
  ObjectType,
  PickType,
} from '@nestjs/graphql';

import { ElementSchema } from '@app/entities/elements/schema';
import { PageContextInput } from './page.ctx.input';

@InputType()
export class CreateElementInput extends IntersectionType(
  PageContextInput,
  PickType(
    ElementSchema,
    ['type', 'parent', 'isRoot', 'props'] as const,
    ObjectType,
  ),
) {}
