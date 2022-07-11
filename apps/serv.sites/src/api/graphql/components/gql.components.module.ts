import { GqlComponentsResolver } from './gql.components.resolver';
import { Module } from '@nestjs/common';
import { gRpcController } from '@app/grpc/grpc.controller';
import { gRpcModule } from '@app/grpc/grpc.module';

@Module({
  providers: [gRpcController, GqlComponentsResolver],
  imports: [gRpcModule],
})
export class GqlComponentsModule {}
