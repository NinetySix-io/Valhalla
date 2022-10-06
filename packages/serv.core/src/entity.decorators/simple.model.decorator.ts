import { Severity, modelOptions } from '@typegoose/typegoose';

import { ICustomOptions } from '@typegoose/typegoose/lib/types';
import { SchemaOptions } from 'mongoose';

export function SimpleModel(
  collection: string | undefined = undefined,
  {
    schema = {},
    allowMixed,
    ...options
  }: Omit<ICustomOptions, 'allowMixed'> & {
    schema?: SchemaOptions;
    allowMixed?: boolean;
  } = {},
): ClassDecorator {
  return function (target) {
    return modelOptions({
      options: {
        allowMixed: allowMixed ? Severity.ALLOW : Severity.WARN,
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
