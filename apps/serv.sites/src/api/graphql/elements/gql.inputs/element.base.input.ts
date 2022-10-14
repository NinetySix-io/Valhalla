import { Field, InputType } from '@nestjs/graphql';

import { ElementAreaInput } from './element.area.input';

@InputType()
export class ElementBaseInput {
  @Field(() => ElementAreaInput, { nullable: true })
  desktop: ElementAreaInput;

  @Field(() => ElementAreaInput, { nullable: true })
  tablet?: ElementAreaInput;

  @Field(() => ElementAreaInput, { nullable: true })
  mobile?: ElementAreaInput;
}
