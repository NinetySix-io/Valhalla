import { GrpcClient, RpcClient, Service } from '@nestcloud2/grpc';
import {
  ORGS_SERVICE_NAME,
  OrgsServiceClient,
  protobufPackage,
} from '../protobuf/serv.orgs';

import { Injectable } from '@nestjs/common';
import { MetadataProvider } from '../metadata.provider';
import path from 'path';

const protoPath = path.resolve(
  __dirname,
  '../protobuf',
  'serv.orgs',
  'index.proto',
);

@Injectable()
export class OrgsRpcClientService extends MetadataProvider<OrgsServiceClient> {
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
  public _svc!: OrgsServiceClient;

  public svc!: OrgsServiceClient;
}
