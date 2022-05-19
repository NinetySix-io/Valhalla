import { GrpcClient, RpcClient, Service } from '@nestcloud2/grpc';
import {
  ACCESS_SERVICE_NAME,
  AccessServiceClient,
  protobufPackage,
} from '../protobuf/serv.access';

import { Injectable } from '@nestjs/common';
import path from 'path';

const protoPath = path.resolve(
  __dirname,
  '../protobuf',
  'serv.access',
  'access.proto',
);

@Injectable()
export class AccessRpcClientService {
  @RpcClient({
    package: protobufPackage,
    service: ACCESS_SERVICE_NAME,
    protoPath,
  })
  public readonly client: GrpcClient;

  @Service(ACCESS_SERVICE_NAME, {
    package: protobufPackage,
    service: protobufPackage,
    protoPath,
  })
  public svc: AccessServiceClient;
}
