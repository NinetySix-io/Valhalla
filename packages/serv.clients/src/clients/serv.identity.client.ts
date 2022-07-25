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

const service = protobufPackage;
const loader = {
  includeDirs: ['../protobuf.presets'],
};

@Injectable()
export class IdentityRpcClientService extends MetadataProvider<IdentityServiceClient> {
  @RpcClient({
    package: service,
    service,
    protoPath,
    loader,
    url: undefined,
  })
  public readonly client!: GrpcClient;

  @Service(IDENTITY_SERVICE_NAME, {
    package: service,
    service,
    protoPath,
    loader,
    url: undefined,
  })
  public _svc!: IdentityServiceClient;

  public svc!: IdentityServiceClient;
}
