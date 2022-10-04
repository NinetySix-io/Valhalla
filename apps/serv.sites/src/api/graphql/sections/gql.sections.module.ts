import { GqlSectionsResolver } from './gql.sections.resolver';
import { Module } from '@nestjs/common';
import { gRpcController } from '@app/grpc/grpc.controller';
import { gRpcModule } from '@app/grpc/grpc.module';

@Module({
  providers: [gRpcController, GqlSectionsResolver],
  imports: [gRpcModule],
})
export class GqlSectionsModule {}
