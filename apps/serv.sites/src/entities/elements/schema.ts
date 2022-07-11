import {
  BaseSchema,
  IsObjectId,
  SimpleModel,
  mongoose,
  typegoose,
} from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { ElementType } from '@app/protobuf';
import { IsObject } from 'class-validator';

registerEnumType(ElementType, { name: 'ElementType' });

@ObjectType()
@SimpleModel('elements', { allowMixed: typegoose.Severity.ALLOW })
@typegoose.index({ parent: 1 })
export class ElementSchema extends BaseSchema {
  @typegoose.prop()
  @Expose()
  @Field({
    description: 'When is root, parent is not an element',
    nullable: true,
  })
  isRoot?: boolean;

  @typegoose.prop()
  @Exclude()
  ownBy: mongoose.Types.ObjectId;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Parent of element' })
  parent: string;

  @typegoose.prop()
  @Expose()
  @IsObjectId()
  @Field(() => String)
  updatedBy: mongoose.Types.ObjectId;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Element type' })
  type: ElementType;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Additional properties', nullable: true })
  @IsObject()
  props?: Record<string, unknown>;
}
