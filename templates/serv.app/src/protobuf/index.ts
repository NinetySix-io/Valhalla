import * as _m0 from 'protobufjs/minimal';

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';

import Long from 'long';

export const protobufPackage = 'serv.app';

export const SERV_SITES_PACKAGE_NAME = 'serv.app';

export interface SitesServiceClient {}

export interface SitesServiceController {}

export function SitesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('SitesService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('SitesService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const SITES_SERVICE_NAME = 'SitesService';

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
