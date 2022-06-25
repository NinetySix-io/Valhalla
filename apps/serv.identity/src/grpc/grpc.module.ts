import { AccessProvisionModule } from '@app/modules/access.provision/access.provision.module';
import { CqrsProviderModule } from '@valhalla/serv.core';
import { DbEntitiesModule } from '@app/entities';
import { EmailVerifiedSaga } from '@app/cqrs/sagas/email.verified.saga';
import { Module } from '@nestjs/common';
import { PhoneVerifiedSaga } from '@app/cqrs/sagas/phone.verified.saga';
import { cqrsPath } from '@app/constants';
import { gRpcController } from './grpc.controller';

@Module({
  imports: [
    AccessProvisionModule,
    DbEntitiesModule,
    CqrsProviderModule.forRootAsync(cqrsPath),
  ],
  providers: [EmailVerifiedSaga, PhoneVerifiedSaga],
  controllers: [gRpcController],
})
export class gRpcModule {}
