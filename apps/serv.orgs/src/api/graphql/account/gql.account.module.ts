import { GqlAccountResolver } from './gql.account.resolver';
import { Module } from '@nestjs/common';
import { gRpcController } from '@app/grpc/grpc.controller';
import { gRpcModule } from '@app/grpc/grpc.module';

@Module({
  providers: [gRpcController, GqlAccountResolver],
  imports: [gRpcModule],
})
export class GqlAccountsModule {}
