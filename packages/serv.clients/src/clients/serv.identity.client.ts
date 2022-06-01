import { GrpcClient, RpcClient, Service } from '@nestcloud2/grpc';
import {
  IDENTITY_SERVICE_NAME,
  IdentityServiceClient,
  protobufPackage,
} from '../protobuf/serv.identity';

import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import path from 'path';

const protoPath = path.resolve(
  __dirname,
  '../protobuf',
  'serv.identity',
  'index.proto',
);

@Injectable()
export class IdentityRpcClientService implements OnModuleInit {
  private readonly logger = new Logger(IdentityRpcClientService.name);

  onModuleInit() {
    this.logger.debug('Rpc Client Initialized');
  }

  @RpcClient({
    service: protobufPackage,
    package: protobufPackage,
    protoPath,
  })
  public readonly client!: GrpcClient;

  @Service(IDENTITY_SERVICE_NAME, {
    service: protobufPackage,
    package: protobufPackage,
    protoPath,
  })
  public svc!: IdentityServiceClient;
}
