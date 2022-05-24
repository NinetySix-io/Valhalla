import { BeAnObject, IndexOptions } from '@typegoose/typegoose/lib/types';

import { index } from '@typegoose/typegoose';

export function ExpiryIndex(
  fields: Partial<Record<string, string | 1 | -1>>,
  options: Omit<IndexOptions<BeAnObject>, 'expireAfterSeconds'> = {},
): ClassDecorator {
  return function (target) {
    return index(fields, {
      ...options,
      expireAfterSeconds: 0,
    })(target);
  };
}
