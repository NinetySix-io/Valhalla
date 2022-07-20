import { DocumentType } from '@typegoose/typegoose';
import { ToObjectOptions } from 'mongoose';
import { isDocument } from './is.document';

/**
 * Convert a Mongoose document to a plain JavaScript object.
 */
export function toDto<T>(
  target: DocumentType<T> | T,
  options?: ToObjectOptions,
): T {
  return isDocument(target) ? target.toObject(options) : target;
}
