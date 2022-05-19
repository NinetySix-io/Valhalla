import { AppModule } from './app.module';
import { bootstrapApplication } from '@valhalla/serv.core';
import { protoPath } from './constants';
import { protobufPackage } from './rpc/protobuf/access';

bootstrapApplication(AppModule, {
  grpc: {
    package: protobufPackage,
    protoPath,
  },
});
