import { AsyncContext } from '@nestjs-steroids/async-context';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { toObjectId } from '../../lib';

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  static readonly traceIdKey = 'X-Trace-ID' as const;

  constructor(
    @Inject(AsyncContext) private readonly ac: AsyncContext<string, unknown>,
  ) {}

  use(req: FastifyRequest, _res: unknown, next: () => void) {
    let traceId = String(toObjectId());
    this.ac.register();

    if (typeof req.headers[ContextMiddleware.traceIdKey] === 'string') {
      traceId = req.headers[ContextMiddleware.traceIdKey] as string;
    } else {
      req.headers[ContextMiddleware.traceIdKey] = traceId;
    }

    this.ac.set('traceId', traceId);
    next();
  }
}
