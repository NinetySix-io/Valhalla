import { ArgsType, Field, PickType } from '@nestjs/graphql';

import { ElementMetaArgs } from './element.meta.args';
import { UpdateTextElementInput } from '../gql.inputs/update.text.element.input';

@ArgsType()
export class UpdateTextElementArgs extends PickType(ElementMetaArgs, [
  'elementId',
] as const) {
  @Field(() => UpdateTextElementInput)
  input: UpdateTextElementInput;
}
