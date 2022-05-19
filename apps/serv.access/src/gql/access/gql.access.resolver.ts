import { Resolver } from '@nestjs/graphql';
import { RpcAccessController } from '@app/rpc/access/access.controller';

@Resolver()
export class GqlAccessResolver {
  constructor(private readonly rpcClient: RpcAccessController) {}
}
