import { BaseSchema, typegoose } from '@valhalla/serv.core';
import { Field, ObjectType, PickType, registerEnumType } from '@nestjs/graphql';

import { ElementType } from '@app/protobuf';
import { Expose } from 'class-transformer';
import { IsObject } from 'class-validator';

registerEnumType(ElementType, { name: 'ElementType' });

@typegoose.modelOptions({
  schemaOptions: {
    timestamps: false,
    id: false,
  },
})
@ObjectType()
export class ElementStyleSchema extends PickType(
  BaseSchema,
  ['updatedAt'],
  ObjectType,
) {}

@typegoose.modelOptions({
  schemaOptions: {
    timestamps: true,
    id: false,
  },
})
@ObjectType()
export class ElementSchema extends PickType(
  BaseSchema,
  ['updatedAt'],
  ObjectType,
) {
  @typegoose.prop()
  @Expose()
  @Field({ description: 'Element type' })
  type: ElementType;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Element ID' })
  id?: string;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Element class name' })
  className?: string;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Element children' })
  children: Array<ElementSchema>;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Element style' })
  style?: ElementStyleSchema;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Additional properties' })
  @IsObject()
  props?: Record<string, string | number>;
}
