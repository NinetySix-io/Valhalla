import { GqlAccessResolver } from './gql.access.resolver';
import { Module } from '@nestjs/common';
import { RpcAccessController } from '@app/rpc/access/access.controller';
import { RpcAccessModule } from '@app/rpc/access/access.module';

@Module({
  providers: [GqlAccessResolver, RpcAccessController],
  imports: [RpcAccessModule],
})
export class GqlAccessModule {}
