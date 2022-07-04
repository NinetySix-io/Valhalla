import { BeAnObject, IndexOptions } from '@typegoose/typegoose/lib/types';

import { IndexDefinition } from 'mongoose';
import { index } from '@typegoose/typegoose';

export function ExpiryIndex(
  fields: IndexDefinition,
  options: Omit<IndexOptions<BeAnObject>, 'expireAfterSeconds'> = {},
): ClassDecorator {
  return function (target) {
    return index(fields, {
      ...options,
      expireAfterSeconds: 0,
    })(target);
  };
}
