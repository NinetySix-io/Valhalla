import { GqlElementsResolver } from './gql.elements.resolver';
import { Module } from '@nestjs/common';
import { gRpcController } from '@app/grpc/grpc.controller';
import { gRpcModule } from '@app/grpc/grpc.module';

@Module({
  providers: [gRpcController, GqlElementsResolver],
  imports: [gRpcModule],
})
export class GqlElementsModule {}
