import {
  BaseSchema,
  IsObjectId,
  SimpleModel,
  typegoose,
} from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { IsUrl, MaxLength, MinLength } from 'class-validator';

import { ElementSchema } from '../elements/schema';
import { Field } from '@nestjs/graphql';
import mongoose from 'mongoose';

@SimpleModel('components')
@typegoose.index({ ownBy: 1 })
export class ComponentSchema extends BaseSchema {
  @typegoose.prop()
  @Exclude()
  @IsObjectId()
  @Field(() => String, { description: 'Owner of the component' })
  ownBy: mongoose.Types.ObjectId;

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
  @Field(() => String, { description: 'URI of the icon', nullable: true })
  iconUrl?: string;

  @typegoose.prop()
  @Expose()
  @MinLength(1)
  @Field({ description: 'Elements' })
  elements: Array<ElementSchema>;
}
