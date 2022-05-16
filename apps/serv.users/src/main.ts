import { AppModule } from './app.module';
import { bootstrapApplication } from '@valhalla/serv.core';
import { protoPath } from './constants';
import { protobufPackage } from './protobuf/users';

bootstrapApplication(AppModule, {
  protoPath,
  grpcPackage: protobufPackage,
});
