import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next.handle().pipe(timeout(100000));
  }
}
