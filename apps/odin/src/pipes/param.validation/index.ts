/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpStatus,
  Injectable,
  Optional,
  PipeTransform,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ValidatorOption } from './types';

@Injectable()
export class ParamValidationPipe<T> implements PipeTransform<T> {
  private validators: ValidatorOption[];
  protected exceptionFactory: (type: HttpStatus, error: string) => any;

  constructor(@Optional() validators?: ValidatorOption[]) {
    this.validators = validators ?? [];
    this.exceptionFactory = (type: HttpStatus, error) =>
      new HttpErrorByCode[type](error);
  }

  /**
   * Method that accesses and performs optional transformation on argument for
   * in-flight requests.
   *
   * @param value currently processed route argument
   * @param metadata contains metadata about the currently processed route argument
   */
  async transform(value: unknown) {
    for (const validator of this.validators) {
      const isValid = await validator.validate(value);
      if (!isValid) {
        throw this.exceptionFactory(
          validator.errorType ?? HttpStatus.BAD_REQUEST,
          validator.errorMessage,
        );
      }
    }

    return value;
  }
}
