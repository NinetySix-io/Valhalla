import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import mongoose from 'mongoose';
import { prop } from '@typegoose/typegoose';

export abstract class BaseSchema {
  @prop()
  createdAt: Date;

  @prop()
  updatedAt: Date;
}

export interface BaseSchema extends Base<mongoose.Types.ObjectId> {
  createdAt: Date;
  updatedAt: Date;
}
