import { AppModule } from './app.module';
import { bootstrapApplication } from '@valhalla/serv.core';
import { protoPath } from './constants';
import { protobufPackage } from './protobuf/tenants';

bootstrapApplication(AppModule, {
  grpc: {
    protoPath,
    package: protobufPackage,
  },
});
