import { GqlAuthResolver } from './gql.access.resolver';
import { Module } from '@nestjs/common';
import { gRpcController } from '@app/grpc/grpc.controller';
import { gRpcModule } from '@app/grpc/grpc.module';

@Module({
  providers: [gRpcController, GqlAuthResolver, gRpcModule],
  exports: [],
})
export class GqlAccessModule {}
