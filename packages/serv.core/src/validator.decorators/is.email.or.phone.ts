import {
  ValidationOptions,
  isEmail,
  isPhoneNumber,
  registerDecorator,
} from 'class-validator';

/**
 * It's a decorator that validates a string property to be either an email or a phone number
 */
export function IsEmailOrPhone(
  validationOptions: ValidationOptions = {},
): PropertyDecorator {
  return (object: object, propertyName: string | Symbol) => {
    registerDecorator({
      name: IsEmailOrPhone.name,
      target: object.constructor,
      propertyName: String(propertyName),
      options: {
        message: 'Invalid email or phone type',
        ...validationOptions,
      },
      validator: {
        validate(value: string) {
          return isEmail(value) || isPhoneNumber(value);
        },
      },
    });
  };
}
