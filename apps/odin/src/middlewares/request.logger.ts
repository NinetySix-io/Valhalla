import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import express from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ): void {
    const { ip, method, originalUrl: url } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${method} ${url} Status[${statusCode}] Size[${contentLength}] IP[${ip}] - ${userAgent}`,
      );
    });

    next();
  }
}
