import { isEmail, isPhoneNumber } from 'class-validator';

import { ValidatorOption } from './types';

export const EmailParamValidation: ValidatorOption = {
  validate: isEmail,
  errorMessage: 'Invalid email address provided',
};

export const PhoneParamValidation: ValidatorOption = {
  validate: isPhoneNumber,
  errorMessage: 'Invalid phone number provided',
};
