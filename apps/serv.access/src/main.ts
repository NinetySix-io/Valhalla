import { AppModule } from './app.module';
import { bootstrapApplication } from '@valhalla/serv.core';
import { protobufPackage } from './protobuf/access';
import { protoPath } from './constants';

bootstrapApplication(AppModule, {
  grpcPackage: protobufPackage,
  protoPath,
});
