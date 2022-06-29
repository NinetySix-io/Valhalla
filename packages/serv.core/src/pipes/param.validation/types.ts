import { HttpStatus } from '@nestjs/common';

export type ValidatorOption<V> = {
  validate: (value: V) => boolean | Promise<boolean | void>;
  errorMessage?: string;
  errorType?: HttpStatus;
};
