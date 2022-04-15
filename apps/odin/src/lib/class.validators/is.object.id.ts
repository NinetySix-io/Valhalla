import { ValidationOptions, registerDecorator } from 'class-validator';

import mongoose from 'mongoose';

export function IsObjectId(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: object, propertyName: string | symbol) => {
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
