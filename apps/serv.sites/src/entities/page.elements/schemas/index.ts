import { BaseSchema, SimpleModel } from '@valhalla/serv.core';

import { PageElementAreaSchema } from './area.schema';
import { PrimitiveElementType } from '@app/protobuf';
import mongoose from 'mongoose';
import { typegoose } from '@valhalla/serv.core';

@SimpleModel('page-elements', { schema: { strict: false } })
export class PageElementSchema extends BaseSchema {
  @typegoose.prop()
  group: mongoose.Types.ObjectId;

  @typegoose.prop()
  type: PrimitiveElementType;

  @typegoose.prop({ type: PageElementAreaSchema })
  desktop: PageElementAreaSchema;

  @typegoose.prop({ type: PageElementAreaSchema })
  tablet?: PageElementAreaSchema;

  @typegoose.prop({ type: PageElementAreaSchema })
  mobile?: PageElementAreaSchema;

  @typegoose.prop()
  updatedBy: mongoose.Types.ObjectId;

  @typegoose.prop()
  createdBy: mongoose.Types.ObjectId;
}
