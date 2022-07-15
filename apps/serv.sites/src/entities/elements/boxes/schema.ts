import { Field, ObjectType } from '@nestjs/graphql';

import { ElementSchema } from '../schemas/element.schema';
import { Expose } from 'class-transformer';
import { HTMLType } from '@app/protobuf';
import { typegoose } from '@valhalla/serv.core';

@ObjectType()
export class BoxElementSchema extends ElementSchema {
  @typegoose.prop()
  @Expose()
  @Field(() => HTMLType)
  htmlType: HTMLType;
}
