import { GqlUserResolver } from './gql.accounts.resolver';
import { Module } from '@nestjs/common';
import { RpcController } from '@app/rpc/rpc.controller';
import { RpcModule } from '@app/rpc/rpc.module';

@Module({
  providers: [GqlUserResolver, RpcController],
  imports: [RpcModule],
})
export class GqlUserModule {}
