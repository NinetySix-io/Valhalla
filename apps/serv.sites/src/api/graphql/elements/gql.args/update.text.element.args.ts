import {
  ArgsType,
  Field,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

import { ElementAreaArgs } from './element.area.args';
import { ElementMetaArgs } from './element.meta.args';
import { ElementText } from '../gql.types/element.text';

@ArgsType()
export class UpdateTextElementArgs extends IntersectionType(
  PickType(ElementMetaArgs, ['elementId'] as const),
  PartialType(PickType(ElementText, ['html', 'json'] as const, ArgsType)),
) {
  @Field(() => ElementAreaArgs, { nullable: true })
  desktop?: ElementAreaArgs;

  @Field(() => ElementAreaArgs, { nullable: true })
  tablet?: ElementAreaArgs;

  @Field(() => ElementAreaArgs, { nullable: true })
  mobile?: ElementAreaArgs;
}
