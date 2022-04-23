import { IsOptional as IsOptionalValidator, ValidateIf } from 'class-validator';

import { ValidationOptions } from 'class-validator';

/**
 * Checks if value is missing and if so, ignores all validators.
 *
 * @param nullable If `true`, all other validators will be skipped even when the value is `null`. `false` by default.
 * @param validationOptions {@link ValidationOptions}
 *
 * @see IsOptional exported from `class-validator.
 */
export function IsOptional(
  nullable = false,
  validationOptions?: ValidationOptions,
) {
  if (nullable) {
    return IsOptionalValidator(validationOptions);
  }

  return ValidateIf((_ob: unknown, v: unknown) => {
    return v !== undefined;
  }, validationOptions);
}