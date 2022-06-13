import { ObjectId, Types } from 'mongoose';

/**
 * It converts a string to an ObjectId
 * @param {string | ObjectId} target - string | ObjectId
 * @returns A new ObjectId
 */
export function toObjectId(target?: string | ObjectId) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // For some reason bson constructor is not recognized
  return new Types.ObjectId(target);
}
