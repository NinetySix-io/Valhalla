import { Field, ObjectType } from '@nestjs/graphql';

import { Expose } from 'class-transformer';
import { Min } from 'class-validator';
import { NonNegativeIntResolver } from 'graphql-scalars';
import { PageElementAreaProto } from '@app/cqrs/protos/page.element.area.proto';

@ObjectType()
export class ElementArea implements PageElementAreaProto {
  @Expose()
  @Field(() => NonNegativeIntResolver)
  @Min(0)
  x: number;

  @Expose()
  @Field(() => NonNegativeIntResolver)
  @Min(0)
  y: number;

  @Expose()
  @Field(() => NonNegativeIntResolver)
  @Min(1)
  height: number;

  @Expose()
  @Field(() => NonNegativeIntResolver)
  @Min(1)
  width: number;

  @Expose()
  @Field(() => NonNegativeIntResolver)
  @Min(0)
  isVisible: boolean;
}
