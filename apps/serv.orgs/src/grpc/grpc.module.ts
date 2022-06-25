import { CqrsProviderModule } from '@valhalla/serv.core';
import { DbEntitiesModule } from '@app/entities';
import { Module } from '@nestjs/common';
import { cqrsPath } from '@app/constants';
import { gRpcController } from './grpc.controller';

@Module({
  imports: [DbEntitiesModule, CqrsProviderModule.forRootAsync(cqrsPath, {})],
  controllers: [gRpcController],
})
export class gRpcModule {}
