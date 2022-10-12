import { mongoose } from '@typegoose/typegoose';

export class BaseSchema {
  _id!: mongoose.Types.ObjectId;
  createdAt!: Date;
  updatedAt!: Date;
}
