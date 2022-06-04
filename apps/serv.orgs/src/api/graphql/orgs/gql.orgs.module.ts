import { GqlOrganizationsResolver } from './gql.orgs.resolver';
import { Module } from '@nestjs/common';
import { gRpcController } from '@app/grpc/grpc.controller';
import { gRpcModule } from '@app/grpc/grpc.module';

@Module({
  providers: [gRpcController, GqlOrganizationsResolver],
  imports: [gRpcModule],
})
export class GqlOrganizationsModule {}
