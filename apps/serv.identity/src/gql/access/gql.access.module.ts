import { GqlAuthResolver } from './gql.access.resolver';
import { Module } from '@nestjs/common';
import { RpcController } from '@app/rpc/rpc.controller';
import { RpcModule } from '@app/rpc/rpc.module';

@Module({
  providers: [RpcController, GqlAuthResolver, RpcModule],
  exports: [],
})
export class GqlAccessModule {}
