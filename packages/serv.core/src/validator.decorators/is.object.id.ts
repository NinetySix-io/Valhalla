import { ValidationOptions, registerDecorator } from 'class-validator';

import { mongoose } from '@typegoose/typegoose';

/**
 * It's a decorator that validates a property to be a valid MongoDB ObjectId
 * @param {ValidationOptions} [validationOptions] - ValidationOptions
 * @returns A function that takes an object and a property name and returns a decorator.
 */
export function IsObjectId(
  validationOptions: ValidationOptions = {},
): PropertyDecorator {
  return (object: object, propertyName: string | Symbol) => {
    registerDecorator({
      name: 'isObjectId',
      target: object.constructor,
      propertyName: String(propertyName),
      options: {
        message: 'Invalid data type',
        ...validationOptions,
      },
      validator: {
        validate(value: unknown) {
          return mongoose.isValidObjectId(value);
        },
      },
    });
  };
}
