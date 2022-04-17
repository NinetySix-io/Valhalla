import { Severity, modelOptions } from '@typegoose/typegoose';

import { ICustomOptions } from '@typegoose/typegoose/lib/types';

export function simpleModel(collection: string, options: ICustomOptions = {}) {
  return function (target): void {
    return modelOptions({
      options: {
        allowMixed: Severity.ERROR,
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
