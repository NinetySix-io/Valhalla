import { Resolver } from '@nestjs/graphql';
import { gRpcController } from '@app/grpc/grpc.controller';

@Resolver()
export class GqlComponentsResolver {
  constructor(private readonly rpcClient: gRpcController) {}
}
