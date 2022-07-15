import { Field, ObjectType } from '@nestjs/graphql';

import { Expose } from 'class-transformer';
import { typegoose } from '@valhalla/serv.core';

@ObjectType()
@typegoose.modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class DirectionalSchema {
  @typegoose.prop()
  @Expose()
  @Field({ description: 'Left side', nullable: true })
  left?: string;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Right side', nullable: true })
  right?: string;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Top side', nullable: true })
  top?: string;

  @typegoose.prop()
  @Field({ description: 'Bottom side', nullable: true })
  bottom?: string;
}
