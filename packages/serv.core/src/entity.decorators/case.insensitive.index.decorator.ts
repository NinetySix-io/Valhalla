import { BeAnObject, IndexOptions } from '@typegoose/typegoose/lib/types';

import { index } from '@typegoose/typegoose';

export function CaseInsensitiveIndex(
  fields: Partial<Record<string, string | 1 | -1>>,
  options: Omit<IndexOptions<BeAnObject>, 'collation'> = {},
): ClassDecorator {
  return function (target) {
    return index(fields, {
      ...options,
      collation: {
        locale: 'en',
        strength: 2,
      },
    })(target);
  };
}
