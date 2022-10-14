import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

import { ElementBaseInput } from './element.base.input';
import { ElementText } from '../gql.types/element.text';

@InputType()
export class UpdateTextElementInput extends IntersectionType(
  PartialType(ElementBaseInput),
  PartialType(PickType(ElementText, ['html', 'json'] as const, InputType)),
) {}
