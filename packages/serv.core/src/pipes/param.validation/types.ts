import { HttpStatus } from '@nestjs/common';

export type ValidatorOption = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate: (value: any) => boolean | Promise<boolean>;
  errorMessage: string;
  errorType?: HttpStatus;
};
