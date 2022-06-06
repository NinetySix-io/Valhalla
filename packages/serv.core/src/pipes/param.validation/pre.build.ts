import { isEmail, isEmpty, isPhoneNumber } from 'class-validator';

import { ValidatorOption } from './types';

export const EmailParamValidation: ValidatorOption = {
  validate: isEmail,
  errorMessage: 'Invalid email address provided',
};

export const PhoneParamValidation: ValidatorOption = {
  validate: isPhoneNumber,
  errorMessage: 'Invalid phone number provided',
};

export const EmptyStringValidation: ValidatorOption = {
  validate: isEmpty,
  errorMessage: 'Field must be a non-empty string',
};
