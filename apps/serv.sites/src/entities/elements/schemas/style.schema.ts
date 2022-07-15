import { Field, ObjectType } from '@nestjs/graphql';

import { DirectionalSchema } from './directional.schema';
import { Expose } from 'class-transformer';
import { typegoose } from '@valhalla/serv.core';

@ObjectType()
@typegoose.modelOptions({ schemaOptions: { _id: false } })
export class StyleSchema {
  @typegoose.prop()
  @Expose()
  @Field(() => DirectionalSchema, { description: 'Padding' })
  padding?: DirectionalSchema;

  @typegoose.prop()
  @Expose()
  @Field(() => DirectionalSchema, { description: 'Margin' })
  margin?: DirectionalSchema;

  @typegoose.prop()
  @Expose()
  @Field(() => DirectionalSchema, { description: 'Border radius' })
  borderRadius?: DirectionalSchema;
}
