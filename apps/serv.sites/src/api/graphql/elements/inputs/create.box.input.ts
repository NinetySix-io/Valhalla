import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

import { BoxElementSchema } from '@app/entities/elements/boxes/schema';
import { ElementCtxInput } from './ctx.input';

@InputType()
export class CreateBoxInput extends IntersectionType(
  ElementCtxInput,
  PartialType(PickType(BoxElementSchema, ['htmlType'], InputType)),
) {}
