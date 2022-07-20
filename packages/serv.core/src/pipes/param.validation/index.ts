import {
  HttpStatus,
  Injectable,
  Optional,
  PipeTransform,
} from '@nestjs/common';
import {
  ErrorHttpStatusCode,
  HttpErrorByCode,
} from '@nestjs/common/utils/http-error-by-code.util';
import { ValidatorOption } from './types';

@Injectable()
export class ParamValidationPipe<T> implements PipeTransform<T> {
  private validators: ValidatorOption<T>[];
  protected exceptionFactory: (
    type: ErrorHttpStatusCode,
    error: string,
  ) => unknown;

  constructor(@Optional() validators?: ValidatorOption<T>[]) {
    this.validators = validators ?? [];
    this.exceptionFactory = (type: ErrorHttpStatusCode, error) => {
      const HttpError = HttpErrorByCode[type];
      return new HttpError(error);
    };
  }

  /**
   * Method that accesses and performs optional transformation on argument for
   * in-flight requests.
   */
  async transform(value: T) {
    for (const validator of this.validators) {
      try {
        const isValid = await validator.validate(value);
        if (!isValid) {
          throw this.exceptionFactory(
            (validator.errorType as ErrorHttpStatusCode) ||
              HttpStatus.BAD_REQUEST,
            validator.errorMessage ?? 'Validation Failed',
          );
        }
      } catch (e) {
        throw this.exceptionFactory(
          (validator.errorType as ErrorHttpStatusCode) ||
            HttpStatus.BAD_REQUEST,
          validator.errorMessage ?? (e as Error).message ?? 'Validation Failed',
        );
      }
    }

    return value;
  }
}
