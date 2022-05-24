import { GrpcClient, RpcClient, Service } from '@nestcloud2/grpc';
import {
  TENANT_BILLINGS_SERVICE_NAME,
  TenantBillingsServiceClient,
  protobufPackage,
} from '../protobuf/serv.tenant.billings';

import { Injectable } from '@nestjs/common';
import path from 'path';

const protoPath = path.resolve(
  __dirname,
  '../protobuf',
  'serv.tenant.billings',
  'tenant.billings.proto',
);

@Injectable()
export class TenantBillingsRpcClientService {
  @RpcClient({
    service: protobufPackage,
    package: protobufPackage,
    protoPath,
  })
  public readonly client!: GrpcClient;

  @Service(TENANT_BILLINGS_SERVICE_NAME, {
    service: protobufPackage,
    package: protobufPackage,
    protoPath,
  })
  public svc!: TenantBillingsServiceClient;
}
