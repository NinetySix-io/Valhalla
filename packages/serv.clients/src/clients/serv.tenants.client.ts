import { GrpcClient, RpcClient, Service } from '@nestcloud2/grpc';
import {
  TENANTS_SERVICE_NAME,
  TenantsServiceClient,
  protobufPackage,
} from '../protobuf/serv.tenants';

import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import path from 'path';

const protoPath = path.resolve(
  __dirname,
  '../protobuf',
  'serv.tenants',
  'index.proto',
);

@Injectable()
export class TenantsRpcClientService implements OnModuleInit {
  private readonly logger = new Logger(TenantsRpcClientService.name);

  onModuleInit() {
    this.logger.debug('Rpc Client Initialized');
  }

  @RpcClient({
    service: protobufPackage,
    package: protobufPackage,
    protoPath,
  })
  public readonly client!: GrpcClient;

  @Service(TENANTS_SERVICE_NAME, {
    service: protobufPackage,
    package: protobufPackage,
    protoPath,
  })
  public svc!: TenantsServiceClient;
}
