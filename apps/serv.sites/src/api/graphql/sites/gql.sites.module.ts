import { GqlSitesResolver } from './gql.sites.resolver';
import { Module } from '@nestjs/common';
import { gRpcController } from '@app/grpc/grpc.controller';
import { gRpcModule } from '@app/grpc/grpc.module';

@Module({
  providers: [gRpcController, GqlSitesResolver],
  imports: [gRpcModule],
})
export class GqlSitesModule {}
