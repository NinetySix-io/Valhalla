import { AppModule } from './app.module';
import { bootstrapApplication } from '@valhalla/serv.core';
import dotenv from 'dotenv';
import path from 'path';
import { protoPath } from './constants';
import { protobufPackage } from './protobuf/tenant.billing';

dotenv.config({
  path: path.resolve(__dirname, '.env'),
});

bootstrapApplication(AppModule, {
  grpc: {
    protoPath,
    package: protobufPackage,
  },
});
