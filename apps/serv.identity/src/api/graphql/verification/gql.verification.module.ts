import { GqlVerificationResolver } from './gql.verification.resolver';
import { Module } from '@nestjs/common';
import { gRpcController } from '@app/grpc/grpc.controller';
import { gRpcModule } from '@app/grpc/grpc.module';

@Module({
  providers: [gRpcController, gRpcModule, GqlVerificationResolver],
})
export class GqlVerificationModule {}
