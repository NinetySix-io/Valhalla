import {
  BaseSchema,
  IsObjectId,
  SimpleModel,
  typegoose,
} from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { IsUrl, MaxLength, MinLength } from 'class-validator';

import { EditStatus } from '@app/protobuf';
import { ElementSchema } from '../elements/schema';
import { Field } from '@nestjs/graphql';
import mongoose from 'mongoose';

@SimpleModel('components')
@typegoose.index({ owners: 1 })
export class ComponentSchema extends BaseSchema {
  @typegoose.prop()
  @Expose()
  @Field({ description: 'Edit status' })
  status: EditStatus;

  @typegoose.prop()
  @Exclude()
  @Field({ description: 'Owners of the component' })
  owners: string[];

  @typegoose.prop()
  @Expose()
  @IsObjectId()
  @Field(() => String, { description: 'Account ID' })
  createdBy: mongoose.Types.ObjectId;

  @typegoose.prop()
  @Expose()
  @IsObjectId()
  @Field(() => String, { description: 'Account ID' })
  updatedBy: mongoose.Types.ObjectId;

  @typegoose.prop()
  @Expose()
  @MinLength(3)
  @MaxLength(30)
  @Field(() => String, { description: "Component's name" })
  name: string;

  @typegoose.prop()
  @Expose()
  @IsUrl()
  @Field(() => String, { description: 'Thumbnail URI', nullable: true })
  thumbnailUrl?: string;

  @typegoose.prop()
  @Exclude()
  elements: Array<ElementSchema>;
}
