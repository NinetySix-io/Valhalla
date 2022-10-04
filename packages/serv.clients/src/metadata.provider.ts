import { AsyncContext } from '@nestjs-steroids/async-context';
import { Metadata } from '@grpc/grpc-js';
import { Inject, OnApplicationBootstrap } from '@nestjs/common';
import { metadataKeys } from './metadata.keys';

export abstract class MetadataProvider<T> implements OnApplicationBootstrap {
  public abstract svc: T;
  public abstract _svc: T;

  constructor(
    @Inject(AsyncContext) private readonly ac: AsyncContext<string, string>,
  ) {}

  onApplicationBootstrap() {
    if (!this._svc) {
      return;
    }

    this.svc = {} as T;
    for (const key of Object.keys(this._svc)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.svc[key] = this.buildWrapperFn(key);
    }
  }

  private get metadata(): Metadata {
    const metadata = new Metadata();

    if (!this.ac.als.getStore()) {
      return metadata;
    }

    for (const metadataKey of metadataKeys) {
      const metadataValue = this.ac.get(metadataKey);
      if (metadataValue) {
        metadata.set(
          metadataKey,
          typeof metadataValue === 'string'
            ? metadataValue
            : JSON.stringify(metadataValue),
        );
      }
    }

    return metadata;
  }

  private buildWrapperFn(key: keyof T) {
    return (request: unknown) => {
      const callerFn = this._svc[key] as unknown as Function;
      return callerFn(request, this.metadata);
    };
  }
}
