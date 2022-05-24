import { GrpcClient, RpcClient, Service } from '@nestcloud2/grpc';
import {
  USERS_SERVICE_NAME,
  UsersServiceClient,
  protobufPackage,
} from '../protobuf/serv.users';

import { Injectable } from '@nestjs/common';
import path from 'path';

const protoPath = path.resolve(
  __dirname,
  '../protobuf',
  'serv.users',
  'users.proto',
);

@Injectable()
export class UsersRpcClientService {
  @RpcClient({
    service: protobufPackage,
    package: protobufPackage,
    protoPath,
  })
  public readonly client!: GrpcClient;

  @Service(USERS_SERVICE_NAME, {
    service: protobufPackage,
    package: protobufPackage,
    protoPath,
  })
  public svc!: UsersServiceClient;
}
