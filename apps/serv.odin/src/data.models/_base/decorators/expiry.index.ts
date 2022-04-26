import { BeAnObject, IndexOptions } from '@typegoose/typegoose/lib/types';

import { index } from '@typegoose/typegoose';

export function expiryIndex(
  fields: Partial<Record<string, string | 1 | -1>>,
  options: Omit<IndexOptions<BeAnObject>, 'expireAfterSeconds'> = {},
) {
  return function (target): void {
    return index(fields, {
      ...options,
      expireAfterSeconds: 0,
    })(target);
  };
}
