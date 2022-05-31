import { GrpcClient, RpcClient, Service } from '@nestcloud2/grpc';
import {
  TENANT_BILLINGS_SERVICE_NAME,
  TenantBillingsServiceClient,
  protobufPackage,
} from '../protobuf/serv.tenant.billings';

import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import path from 'path';

const protoPath = path.resolve(
  __dirname,
  '../protobuf',
  'serv.tenant.billings',
  'index.proto',
);

@Injectable()
export class TenantBillingsRpcClientService implements OnModuleInit {
  private readonly logger = new Logger(TenantBillingsRpcClientService.name);

  onModuleInit() {
    this.logger.debug('Rpc Client Initialized');
  }

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
