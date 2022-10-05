import { Severity, modelOptions } from '@typegoose/typegoose';

import { ICustomOptions } from '@typegoose/typegoose/lib/types';
import { SchemaOptions } from 'mongoose';

export function SimpleModel(
  collection: string = null,
  {
    schema = {},
    ...options
  }: ICustomOptions & {
    schema?: SchemaOptions;
  } = {},
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
        ...schema,
      },
    })(target);
  };
}
