import { isEmail, isPhoneNumber } from 'class-validator';

import { ValidatorOption } from './types';
import { isEmpty } from '@valhalla/utilities';
import { isObjectIdOrHexString } from 'mongoose';

export const EmailParamValidation: ValidatorOption<string> = {
  validate: isEmail,
  errorMessage: 'Invalid email address provided',
};

export const PhoneParamValidation: ValidatorOption<string> = {
  validate: isPhoneNumber,
  errorMessage: 'Invalid phone number provided',
};

export const EmptyStringValidation: ValidatorOption<string> = {
  validate: (v) => !isEmpty(v),
  errorMessage: 'Field must be a non-empty string',
};

export const ObjectIdParamValidation: ValidatorOption<string> = {
  validate: isObjectIdOrHexString,
  errorMessage: 'Invalid id type',
};

export const EmptyObjectValidation: ValidatorOption<object> = {
  validate: (v) => !isEmpty(v),
  errorMessage: 'Field has no properties',
};

/**
 * It takes an array of validators and returns a validator that will validate if any of the validators
 * in the array validate
 */
export function OrValidation<T>(
  validators: ValidatorOption<T>[],
): ValidatorOption<T> {
  return {
    validate: (value) => {
      for (const validator of validators) {
        if (!validator.validate(value)) {
          return true;
        }
      }

      throw new Error(validators[0].errorMessage);
    },
  };
}

/**
 * It takes an array of validators and returns a validator that runs all of them and returns true if
 * all of them return true
 */
export function AndValidation<T>(
  validators: ValidatorOption<T>[],
): ValidatorOption<T> {
  return {
    validate: (value) => {
      for (const validator of validators) {
        if (!validator.validate(value)) {
          throw new Error(validator.errorMessage);
        }
      }

      return true;
    },
  };
}
