import { InputType, PickType } from '@nestjs/graphql';

import { ElementArea } from '../gql.types/element.area';

@InputType()
export class ElementAreaInput extends PickType(
  ElementArea,
  ['height', 'isVisible', 'width', 'x', 'y'] as const,
  InputType,
) {}
