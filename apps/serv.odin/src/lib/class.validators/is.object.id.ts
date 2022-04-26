import { ValidationOptions, registerDecorator } from 'class-validator';

import mongoose from 'mongoose';

export function IsObjectId(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string | symbol) => {
    registerDecorator({
      name: 'isObjectId',
      target: object.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions,
      validator: {
        validate(value) {
          return mongoose.isObjectIdOrHexString(value);
        },
      },
    });
  };
}
