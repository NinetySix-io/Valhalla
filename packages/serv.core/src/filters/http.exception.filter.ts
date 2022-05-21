import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { BaseExceptionFilter } from '@nestjs/core';
import { FastifyReply } from 'fastify';

@Catch(HttpException, Error)
export class HttpExceptionFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  /**
   * It checks if the exception has the getResponse and getStatus methods
   * @param {Error | HttpException} exception - The exception that was thrown.
   * @returns The exception is being returned.
   */
  private isHttpException(
    exception: Error | HttpException,
  ): exception is HttpException {
    return 'getResponse' in exception && 'getStatus' in exception;
  }

  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    if (this.isHttpException(exception)) {
      return response
        .status(exception.getStatus())
        .send(exception.getResponse());
    }

    const errorMsg = exception.message;
    const DefaultError = new InternalServerErrorException(errorMsg);
    const responseStatus = DefaultError.getStatus();
    const responseMsg = DefaultError.getResponse();
    Logger.error('Unexpected Error', exception);
    console.error(exception);
    return response.status(responseStatus).send(responseMsg);
  }
}
