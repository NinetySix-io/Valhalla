import { GrpcClient, RpcClient, Service } from '@nestcloud2/grpc';
import {
  IDENTITY_SERVICE_NAME,
  IdentityServiceClient,
  protobufPackage,
} from '../protobuf/serv.identity';

import { Injectable } from '@nestjs/common';
import { MetadataProvider } from '../metadata.provider';
import path from 'path';

const protoPath = path.resolve(
  __dirname,
  '../protobuf',
  'serv.identity',
  'index.proto',
);

@Injectable()
export class IdentityRpcClientService extends MetadataProvider<IdentityServiceClient> {
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
  public _svc!: IdentityServiceClient;

  public svc!: IdentityServiceClient;
}
