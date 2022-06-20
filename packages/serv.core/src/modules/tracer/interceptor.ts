import { Metadata } from '@grpc/grpc-js';
import { AsyncContext } from '@nestjs-steroids/async-context';
import {
  CallHandler,
  ContextType,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PATTERN_METADATA } from '@nestjs/microservices/constants';
import { metadataKeysMap } from '@valhalla/serv.clients';
import * as rx from 'rxjs';
import { toObjectId } from '../../lib';
import { Telemetry } from './telemetry';

@Injectable()
export class TracerInterceptor implements NestInterceptor {
  constructor(
    @Inject(AsyncContext) private readonly ac: AsyncContext<string, unknown>,
    @Inject(Reflector) private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): rx.Observable<void> {
    const [traceId, isParent] = this.getTraceId(context);
    const telemetry = new Telemetry({
      context,
      traceId,
      isParent,
      callPoint: this.getCallPoint(context),
    });

    if (!this.ac.als.getStore()) {
      this.ac.register();
    }

    this.ac.set('traceId', traceId);
    this.ac.set('_telemetry', telemetry);

    return next.handle().pipe(
      rx.tap({
        next: () => {
          telemetry.finish();
        },
        error: (error) => {
          telemetry.error(error);
        },
      }),
    );
  }

  /**
   * It returns the name of the service and the name of the RPC method if the context is an RPC call,
   * otherwise it returns the type of the context
   * @param {ExecutionContext} context - ExecutionContext
   * @returns The service name and the rpc name.
   */
  private getCallPoint(context: ExecutionContext): string | undefined {
    const type = this.getContextType(context);
    const pattern = this.reflector.get(PATTERN_METADATA, context.getHandler());

    if (type === 'rpc') {
      return pattern.service + '.' + pattern.rpc;
    }

    return undefined;
  }

  /**
   * It returns the type of the context, which is either the type of the context or the string
   * 'graphql'
   * @param {ExecutionContext} context - ExecutionContext
   * @returns The type of the context.
   */
  private getContextType(context: ExecutionContext) {
    return context.getType<ContextType | 'graphql'>();
  }

  /**
   * If the context is an RPC call, then we get the traceId from the metadata. If it's not an RPC call,
   * then we generate a new traceId
   * @param {ExecutionContext} context - ExecutionContext: The context of the current request.
   * @returns [traceId, isParent]
   */
  private getTraceId(context: ExecutionContext): [string, boolean] {
    let traceId = String(toObjectId());
    let isParent = true;
    const type = this.getContextType(context);
    if (type === 'rpc') {
      const metadata: Metadata = context.switchToRpc().getContext();
      const forwardTraceId = metadata.get(metadataKeysMap.traceId)[0];
      if (forwardTraceId) {
        traceId = String(forwardTraceId);
        isParent = false;
      }
    }

    return [traceId, isParent];
  }
}
