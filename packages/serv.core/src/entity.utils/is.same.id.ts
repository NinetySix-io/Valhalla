import { Types } from 'mongoose';

type Valid = string | Types.ObjectId | { _id: Types.ObjectId };

function getId<T extends Valid>(doc: T) {
  return '_id' in doc ? doc._id : doc;
}

/**
 * Returns true if the two objects have the same id.
 */
export function isSameId(A: Valid, B: Valid) {
  return String(getId(A)) === String(getId(B));
}

/**
 * CompareId returns a function that takes a document and returns true if the document has the same id
 * as the target.
 */
export function compareId(target: Valid) {
  return (doc: Valid) => isSameId(doc, target);
}
