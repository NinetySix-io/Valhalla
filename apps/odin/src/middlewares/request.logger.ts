import { Injectable, Logger } from '@nestjs/common';

import type { NestMiddleware } from '@nestjs/common';
import type express from 'express';

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
      const ReqContentLength = request.get('content-length') || 0;
      const ResContentLength = response.get('content-length') || 0;

      const parts = [
        method,
        url,
        `Status[${statusCode}]`,
        `Req[${ReqContentLength}]`,
        `Res[${ResContentLength}]`,
        `IP[${ip}]`,
        '-',
        userAgent,
      ];

      this.logger.log(parts.join(' '));
    });

    next();
  }
}
