import { DocumentType } from '@typegoose/typegoose';
import { ToObjectOptions } from 'mongoose';
import { isDocument } from './is.document';

/**
 * Convert a Mongoose document to a plain JavaScript object.
 * @param {DocumentType<T> | T} target - DocumentType<T> | T
 * @param {ToObjectOptions} [options] - ToObjectOptions
 * @returns a new object with the same values as the original object.
 */
export function toDto<T>(
  target: DocumentType<T> | T,
  options?: ToObjectOptions,
): T {
  return isDocument(target) ? target.toObject(options) : target;
}
