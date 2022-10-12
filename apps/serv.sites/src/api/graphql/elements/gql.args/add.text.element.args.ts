import { ArgsType, Field, PickType } from '@nestjs/graphql';

import { AddTextElementInput } from '../gql.inputs/add.text.element.input';
import { ElementMetaArgs } from './element.meta.args';

@ArgsType()
export class AddTextElementArgs extends PickType(ElementMetaArgs, [
  'groupId',
] as const) {
  @Field(() => AddTextElementInput)
  input: AddTextElementInput;
}
