import { SimpleModel, typegoose } from '@valhalla/serv.core';

import mongoose from 'mongoose';

@SimpleModel(null, {
  schema: {
    _id: false,
    timestamps: false,
  },
})
export class PageSectionFormatSchema {
  @typegoose.prop()
  rowsCount: number;

  @typegoose.prop()
  columnGap: number;

  @typegoose.prop()
  rowGap: number;

  @typegoose.prop()
  updatedBy: mongoose.Types.ObjectId;
}
