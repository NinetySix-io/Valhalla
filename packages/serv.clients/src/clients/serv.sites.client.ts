import { GrpcClient, RpcClient, Service } from '@nestcloud2/grpc';
import {
  SITES_SERVICE_NAME,
  SitesServiceClient,
  protobufPackage,
} from '../protobuf/serv.sites';

import { Injectable } from '@nestjs/common';
import { MetadataProvider } from '../metadata.provider';
import path from 'path';

const protoPath = path.resolve(
  __dirname,
  '../protobuf',
  'serv.sites',
  'index.proto',
);

const service = protobufPackage;
const loader = {
  includeDirs: ['../protobuf.presets'],
};

@Injectable()
export class SitesRpcClientService extends MetadataProvider<SitesServiceClient> {
  @RpcClient({
    package: service,
    service,
    protoPath,
    loader,
  })
  public readonly client!: GrpcClient;

  @Service(SITES_SERVICE_NAME, {
    package: service,
    service,
    protoPath,
    loader,
  })
  public _svc!: SitesServiceClient;

  public svc!: SitesServiceClient;
}
