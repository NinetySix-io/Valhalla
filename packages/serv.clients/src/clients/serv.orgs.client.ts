import { GrpcClient, RpcClient, Service } from '@nestcloud2/grpc';
import {
  ORGS_SERVICE_NAME,
  OrgsServiceClient,
  protobufPackage,
} from '../protobuf/serv.orgs';

import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import path from 'path';

const protoPath = path.resolve(
  __dirname,
  '../protobuf',
  'serv.orgs',
  'index.proto',
);

@Injectable()
export class OrgsRpcClientService implements OnModuleInit {
  private readonly logger = new Logger(OrgsRpcClientService.name);

  onModuleInit() {
    this.logger.debug('Rpc Client Initialized');
  }

  @RpcClient({
    service: protobufPackage,
    package: protobufPackage,
    protoPath,
  })
  public readonly client!: GrpcClient;

  @Service(ORGS_SERVICE_NAME, {
    service: protobufPackage,
    package: protobufPackage,
    protoPath,
  })
  public svc!: OrgsServiceClient;
}
