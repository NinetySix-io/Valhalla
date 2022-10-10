import { Field, InputType } from '@nestjs/graphql';

import { Min } from 'class-validator';
import { PageElementAreaProto } from '@app/cqrs/transformers/page.element.area.proto';

@InputType()
export class ElementAreaArgs implements PageElementAreaProto {
  @Field()
  @Min(0)
  x: number;

  @Field()
  @Min(0)
  y: number;

  @Field()
  @Min(1)
  height: number;

  @Field()
  @Min(1)
  width: number;

  @Field()
  @Min(0)
  isVisible: boolean;
}
