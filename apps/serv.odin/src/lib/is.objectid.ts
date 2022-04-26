import mongoose from 'mongoose';

export function isObjectId(value): value is mongoose.Types.ObjectId | string {
  return mongoose.isObjectIdOrHexString(value);
}
