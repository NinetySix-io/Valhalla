import { isEmail, isEmpty, isPhoneNumber } from 'class-validator';

import { ValidatorOption } from './types';

export const EmailParamValidation: ValidatorOption<string> = {
  validate: isEmail,
  errorMessage: 'Invalid email address provided',
};

export const PhoneParamValidation: ValidatorOption<string> = {
  validate: isPhoneNumber,
  errorMessage: 'Invalid phone number provided',
};

export const EmptyStringValidation: ValidatorOption<string> = {
  validate: isEmpty,
  errorMessage: 'Field must be a non-empty string',
};

/**
 * It takes an array of validators and returns a validator that will validate if any of the validators
 * in the array validate
 * @param {ValidatorOption[]} validators - ValidatorOption[]
 * @returns A function that takes in a value and returns a boolean
 */
export function OrValidation<T>(
  validators: ValidatorOption<T>[],
): ValidatorOption<T> {
  return {
    validate: async (value) => {
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
 * @param {ValidatorOption[]} validators - ValidatorOption[]
 * @returns A function that takes in an array of validators and returns a validator option.
 */
export function AndValidation<T>(
  validators: ValidatorOption<T>[],
): ValidatorOption<T> {
  return {
    validate: async (value) => {
      for (const validator of validators) {
        if (!validator.validate(value)) {
          throw new Error(validator.errorMessage);
        }
      }

      return true;
    },
  };
}
