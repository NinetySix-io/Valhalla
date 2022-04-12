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
    const isGET = method === 'GET';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      const parts = [
        method,
        url,
        `Status[${statusCode}]`,
        `Size[${isGET ? 0 : contentLength}]`,
        `IP[${ip}]`,
        '-',
        userAgent,
      ];

      this.logger.log(parts.join(' '));
    });

    next();
  }
}
