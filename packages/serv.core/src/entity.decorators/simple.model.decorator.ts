import { Severity, modelOptions } from '@typegoose/typegoose';

import { ICustomOptions } from '@typegoose/typegoose/lib/types';

export function SimpleModel(
  collection: string,
  options: ICustomOptions = {},
): ClassDecorator {
  return function (target) {
    return modelOptions({
      options: {
        allowMixed: Severity.WARN,
        ...options,
      },
      schemaOptions: {
        collection,
        timestamps: true,
        toJSON: {
          virtuals: true,
        },
        toObject: {
          virtuals: true,
        },
      },
    })(target);
  };
}
