import { HttpStatus } from '@nestjs/common';

export type ValidatorOption<V = unknown> = {
  validate: (value: V) => boolean | Promise<boolean> | Promise<void>;
  errorMessage?: string;
  errorType?: HttpStatus;
};
