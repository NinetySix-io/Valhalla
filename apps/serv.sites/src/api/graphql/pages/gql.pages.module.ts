import { GqlPagesResolver } from './gql.pages.resolver';
import { Module } from '@nestjs/common';
import { gRpcController } from '@app/grpc/grpc.controller';
import { gRpcModule } from '@app/grpc/grpc.module';

@Module({
  providers: [gRpcController, GqlPagesResolver],
  imports: [gRpcModule],
})
export class GqlPagesModule {}
