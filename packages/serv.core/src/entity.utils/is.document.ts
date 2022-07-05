import { DocumentType } from '@typegoose/typegoose';

/**
 * If the target has a toObject method, then it's a DocumentType, otherwise it's not.
 * @param {DocumentType<T> | T} target - DocumentType<T> | T
 * @returns A function that takes a target and returns a boolean
 */
export function isDocument<T>(
  target: DocumentType<T> | T,
): target is DocumentType<T> {
  return 'toObject' in target;
}
