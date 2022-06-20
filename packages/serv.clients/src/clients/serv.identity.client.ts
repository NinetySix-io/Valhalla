import { GrpcClient, RpcClient, Service } from '@nestcloud2/grpc';
import {
  IDENTITY_SERVICE_NAME,
  IdentityServiceClient,
  protobufPackage,
} from '../protobuf/serv.identity';

import { Injectable } from '@nestjs/common';
import path from 'path';

const protoPath = path.resolve(
  __dirname,
  '../protobuf',
  'serv.identity',
  'index.proto',
);

@Injectable()
export class IdentityRpcClientService {
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
