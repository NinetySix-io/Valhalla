import { Field, ObjectType } from '@nestjs/graphql';

import { Min } from 'class-validator';
import { PageElementAreaProto } from '@app/cqrs/transformers/page.element.area.proto';

@ObjectType()
export class ElementArea implements PageElementAreaProto {
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
