import {
  BaseSchema,
  IsObjectId,
  SimpleModel,
  mongoose,
  typegoose,
} from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

import { ElementType } from '@app/protobuf';
import { StyleSchema } from './style.schema';

@ObjectType({ description: 'Base html element' })
@SimpleModel('elements', { allowMixed: typegoose.Severity.ALLOW })
@typegoose.index({ parent: 1 })
@typegoose.index({ after: 1 })
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
  owners: string[];

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
  @Field(() => ElementType, { description: 'Element type' })
  type: ElementType;

  @typegoose.prop()
  @Expose()
  @Field(() => StyleSchema, { description: 'Element style', nullable: true })
  style?: StyleSchema;

  @typegoose.prop()
  @Expose()
  @Field(() => String, { description: 'Positional', nullable: true })
  after?: mongoose.Types.ObjectId;
}
