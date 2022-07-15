import { Field, ObjectType } from '@nestjs/graphql';

import { ElementSchema } from '../schemas/element.schema';
import { Expose } from 'class-transformer';
import { typegoose } from '@valhalla/serv.core';

@ObjectType()
export class TextElementSchema extends ElementSchema {
  @typegoose.prop()
  @Expose()
  @Field({ description: 'Text' })
  text: string;
}
