import { GrpcClient, RpcClient, Service } from '@nestcloud2/grpc';
import {
  IAM_SERVICE_NAME,
  IamServiceClient,
  protobufPackage,
} from '../protobuf/serv.iam';

import { Injectable } from '@nestjs/common';
import path from 'path';

const protoPath = path.resolve(
  __dirname,
  '../protobuf',
  'serv.iam',
  'iam.proto',
);

@Injectable()
export class IamRpcClientService {
  @RpcClient({
    package: protobufPackage,
    service: IAM_SERVICE_NAME,
    protoPath,
  })
  public readonly client: GrpcClient;

  @Service(IAM_SERVICE_NAME, {
    package: protobufPackage,
    service: protobufPackage,
    protoPath,
  })
  public svc: IamServiceClient;
}
