import { ArgsType, Field, IntersectionType, PickType } from '@nestjs/graphql';

import { ElementAreaArgs } from './element.area.args';
import { ElementMetaArgs } from './element.meta.args';
import { ElementText } from '../gql.types/element.text';

@ArgsType()
export class AddTextElementArgs extends IntersectionType(
  PickType(ElementMetaArgs, ['groupId'] as const),
  PickType(ElementText, ['html', 'json'] as const, ArgsType),
) {
  @Field(() => ElementAreaArgs)
  desktop: ElementAreaArgs;

  @Field(() => ElementAreaArgs, { nullable: true })
  tablet?: ElementAreaArgs;

  @Field(() => ElementAreaArgs, { nullable: true })
  mobile?: ElementAreaArgs;
}
