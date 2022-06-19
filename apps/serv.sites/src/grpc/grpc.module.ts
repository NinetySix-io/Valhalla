import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { gRpcController } from './grpc.controller';

@Module({
  imports: [TypegooseModule.forFeature([])],
  controllers: [gRpcController],
  providers: [],
})
export class gRpcModule {}
