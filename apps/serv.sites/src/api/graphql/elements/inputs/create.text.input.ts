import { InputType, IntersectionType, PickType } from '@nestjs/graphql';

import { ElementCtxInput } from './ctx.input';
import { TextElementSchema } from '@app/entities/elements/text/schema';

@InputType()
export class CreateTextInput extends IntersectionType(
  ElementCtxInput,
  PickType(TextElementSchema, ['text'] as const, InputType),
) {}
