import { BaseSchema, typegoose } from '@valhalla/serv.core';
import { Field, ObjectType } from '@nestjs/graphql';

import { Expose } from 'class-transformer';

@ObjectType()
export class SectionElementPlatform extends BaseSchema {
  @typegoose.prop()
  @Expose()
  @Field({ description: 'X position' })
  x: number;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Y position' })
  y: number;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Height' })
  height: number;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Width' })
  width: number;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Whether this element is visible' })
  isVisible: boolean;
}
