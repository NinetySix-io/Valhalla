import { InputType, IntersectionType, PickType } from '@nestjs/graphql';

import { ElementBaseInput } from './element.base.input';
import { ElementText } from '../gql.types/element.text';

@InputType()
export class AddTextElementInput extends IntersectionType(
  ElementBaseInput,
  PickType(ElementText, ['html', 'json'] as const, InputType),
) {}
