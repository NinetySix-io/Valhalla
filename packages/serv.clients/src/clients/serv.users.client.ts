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
    package: protobufPackage,
    service: USERS_SERVICE_NAME,
    protoPath,
  })
  public readonly client: GrpcClient;

  @Service(USERS_SERVICE_NAME, {
    package: protobufPackage,
    service: protobufPackage,
    protoPath,
  })
  public svc: UsersServiceClient;
}
