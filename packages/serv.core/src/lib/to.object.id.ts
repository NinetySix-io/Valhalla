import mongoose, { Types } from 'mongoose';

/**
 * It converts a string to an ObjectId
 */
export function toObjectId(target?: string | Types.ObjectId) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: there seems to be a constructor conflict
  return new mongoose.Types.ObjectId(target);
}
