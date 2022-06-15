import { Logger } from '@nestjs/common';
import { ORGS_SERVICE_NAME } from '@app/protobuf';

export const GrpcLogger = new Logger(ORGS_SERVICE_NAME);
