import { GqlAccountResolver } from './gql.accounts.resolver';
import { Module } from '@nestjs/common';
import { gRpcController } from '@app/grpc/grpc.controller';
import { gRpcModule } from '@app/grpc/grpc.module';

@Module({
  providers: [GqlAccountResolver, gRpcController],
  imports: [gRpcModule],
})
export class GqlAccountModule {}
