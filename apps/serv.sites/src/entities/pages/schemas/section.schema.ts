import { BaseSchema, SimpleModel, typegoose } from '@valhalla/serv.core';

import { PageSectionFormatSchema } from './section.format.schema';
import mongoose from 'mongoose';

@SimpleModel()
export class PageSectionSchema extends BaseSchema {
  @typegoose.prop({ type: PageSectionFormatSchema })
  format: PageSectionFormatSchema;

  @typegoose.prop()
  updatedBy: mongoose.Types.ObjectId;

  @typegoose.prop()
  createdBy: mongoose.Types.ObjectId;
}
