import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

import { ElementIdCtxInput } from './ctx.input';
import { TextElementSchema } from '@app/entities/elements/text/schema';

@InputType()
export class UpdateTextInput extends IntersectionType(
  ElementIdCtxInput,
  PartialType(PickType(TextElementSchema, ['text'] as const, InputType)),
) {}
