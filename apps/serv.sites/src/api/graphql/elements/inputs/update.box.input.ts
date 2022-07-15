import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

import { BoxElementSchema } from '@app/entities/elements/boxes/schema';
import { ElementIdCtxInput } from './ctx.input';

@InputType()
export class UpdateBoxInput extends IntersectionType(
  ElementIdCtxInput,
  PartialType(PickType(BoxElementSchema, ['htmlType'] as const, InputType)),
) {}
