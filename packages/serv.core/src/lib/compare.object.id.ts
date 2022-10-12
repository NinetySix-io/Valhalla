import { mongoose } from '@typegoose/typegoose';

type ValidEntry = string | mongoose.Types.ObjectId | mongoose.Document;

/**
 * It returns the string representation of the _id property of an object, or the string representation
 * of the object itself if it's not an object or doesn't have an _id property
 */
export function getObjectIdString(target: ValidEntry): string {
  if (typeof target === 'object' && '_id' in target) {
    return String(target._id);
  }

  return String(target);
}

/**
 * It takes two objects, and returns true if they are equal, and false if they are not
 */
export function isEqualObjectId(a: ValidEntry, b: ValidEntry) {
  return getObjectIdString(a) === getObjectIdString(b);
}

/**
 * It takes an object and returns a function that takes another object and returns true if the two
 * objects have the same id
 */
export function compareObjectId(iteratee: ValidEntry) {
  return (target: ValidEntry) => isEqualObjectId(iteratee, target);
}
