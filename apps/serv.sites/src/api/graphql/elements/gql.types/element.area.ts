import { Field, ObjectType } from '@nestjs/graphql';

import { Min } from 'class-validator';
import { NonNegativeIntResolver } from 'graphql-scalars';
import { PageElementAreaProto } from '@app/cqrs/protos/page.element.area.proto';

@ObjectType()
export class ElementArea implements PageElementAreaProto {
  @Field(() => NonNegativeIntResolver)
  @Min(0)
  x: number;

  @Field(() => NonNegativeIntResolver)
  @Min(0)
  y: number;

  @Field(() => NonNegativeIntResolver)
  @Min(1)
  height: number;

  @Field(() => NonNegativeIntResolver)
  @Min(1)
  width: number;

  @Field(() => NonNegativeIntResolver)
  @Min(0)
  isVisible: boolean;
}
