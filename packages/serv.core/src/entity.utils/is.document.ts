import { DocumentType } from '@typegoose/typegoose';

/**
 * If the target has a toObject method, then it's a DocumentType, otherwise it's not.
 */
export function isDocument<T>(
  target: DocumentType<T> | T,
): target is DocumentType<T> {
  return 'toObject' in target;
}
