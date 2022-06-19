import { Logger } from '@nestjs/common';
import { SITES_SERVICE_NAME } from '@app/protobuf';

export const GrpcLogger = new Logger(SITES_SERVICE_NAME);
