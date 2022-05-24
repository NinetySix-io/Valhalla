import { GrpcClient, RpcClient, Service } from '@nestcloud2/grpc';
import {
  TENANTS_SERVICE_NAME,
  TenantsServiceClient,
  protobufPackage,
} from '../protobuf/serv.tenants';

import { Injectable } from '@nestjs/common';
import path from 'path';

const protoPath = path.resolve(
  __dirname,
  '../protobuf',
  'serv.tenants',
  'tenants.proto',
);

@Injectable()
export class TenantsRpcClientService {
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
