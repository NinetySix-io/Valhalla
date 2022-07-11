import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

import { ElementSchema } from '@app/entities/elements/schema';
import { PageContextInput } from './page.ctx.input';

@InputType()
export class UpdateElementInput extends IntersectionType(
  PartialType(
    PickType(ElementSchema, ['parent', 'props', 'type'] as const, InputType),
  ),
  PageContextInput,
) {}
