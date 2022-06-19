import { GrpcClient, RpcClient, Service } from '@nestcloud2/grpc';
import {
  SITES_SERVICE_NAME,
  SitesServiceClient,
  protobufPackage,
} from '../protobuf/serv.sites';

import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import path from 'path';

const protoPath = path.resolve(
  __dirname,
  '../protobuf',
  'serv.sites',
  'index.proto',
);

@Injectable()
export class SitesRpcClientService implements OnModuleInit {
  private readonly logger = new Logger(SitesRpcClientService.name);

  onModuleInit() {
    this.logger.debug('Rpc Client Initialized');
  }

  @RpcClient({
    service: protobufPackage,
    package: protobufPackage,
    protoPath,
  })
  public readonly client!: GrpcClient;

  @Service(SITES_SERVICE_NAME, {
    service: protobufPackage,
    package: protobufPackage,
    protoPath,
  })
  public svc!: SitesServiceClient;
}
