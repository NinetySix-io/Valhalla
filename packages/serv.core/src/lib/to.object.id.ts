import mongoose, { Types } from 'mongoose';

/**
 * It converts a string to an ObjectId
 * @param {string | ObjectId} target - string | ObjectId
 * @returns A new ObjectId
 */
export function toObjectId(target?: string | Types.ObjectId) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: there seems to be a constructor conflict
  return new mongoose.Types.ObjectId(target);
}
