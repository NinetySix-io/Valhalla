import { BaseSchema, SimpleModel, typegoose } from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

import { PageSectionFormatSchema } from './format.schema';
import mongoose from 'mongoose';

@ObjectType()
@SimpleModel('page-sections')
@typegoose.index({ index: 1, page: 1 }, { unique: true })
export class SectionSchema extends BaseSchema {
  @typegoose.prop()
  @Exclude()
  page: mongoose.Types.ObjectId;

  @typegoose.prop()
  @Expose()
  @Field(() => String, { description: 'Head node', nullable: true })
  head?: mongoose.Types.ObjectId;

  @Expose()
  @Field({ description: 'Section format configuration' })
  @typegoose.prop()
  format: PageSectionFormatSchema;

  @typegoose.prop()
  @Expose()
  @Field(() => String)
  updatedBy: mongoose.Types.ObjectId;
}
