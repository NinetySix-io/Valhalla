import { BaseSchema, SimpleModel, typegoose } from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

import { PageSectionFormatSchema } from './section.format.schema';
import mongoose from 'mongoose';

@ObjectType()
@SimpleModel()
export class PageSectionSchema extends BaseSchema {
  @Expose()
  @Field({ description: 'Section format configuration' })
  @typegoose.prop({ type: PageSectionFormatSchema })
  format: PageSectionFormatSchema;

  @typegoose.prop()
  @Expose()
  @Field(() => String)
  updatedBy: mongoose.Types.ObjectId;

  @typegoose.prop()
  @Exclude()
  createdBy: mongoose.Types.ObjectId;
}
