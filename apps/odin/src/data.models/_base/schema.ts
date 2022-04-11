import { Severity, modelOptions, prop } from '@typegoose/typegoose';

import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import mongoose from 'mongoose';

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
  schemaOptions: {
    timestamps: true,
  },
})
export abstract class BaseSchema {
  @prop()
  createdAt: Date; // provided by schemaOptions.timestamps

  @prop()
  updatedAt: Date; // provided by schemaOptions.timestamps
}

export interface BaseSchema extends Base<mongoose.Types.ObjectId> {}
