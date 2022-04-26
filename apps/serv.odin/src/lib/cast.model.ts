import { Ref, RefType } from '@typegoose/typegoose/lib/types';

/**
 * strictly unref model
 */
export function castModel<T, S extends RefType>(doc: Ref<T, S>) {
  return doc as T | undefined;
}
