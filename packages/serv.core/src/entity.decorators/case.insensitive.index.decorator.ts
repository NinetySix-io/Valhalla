import { BeAnObject, IndexOptions } from '@typegoose/typegoose/lib/types';

import { IndexDefinition } from 'mongoose';
import { index } from '@typegoose/typegoose';

export function CaseInsensitiveIndex(
  fields: IndexDefinition,
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
