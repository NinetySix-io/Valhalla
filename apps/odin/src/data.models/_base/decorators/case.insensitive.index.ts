import { BeAnObject, IndexOptions } from '@typegoose/typegoose/lib/types';

import { index } from '@typegoose/typegoose';

export function caseInsensitiveIndex(
  fields: Partial<Record<string, string | 1 | -1>>,
  options: Omit<IndexOptions<BeAnObject>, 'collation'> = {},
) {
  return function (target): void {
    return index(fields, {
      ...options,
      collation: {
        locale: 'en',
        strength: 2,
      },
    })(target);
  };
}
