import { GrpcClass, LogClassMethods } from '@valhalla/serv.core';
import { SITES_SERVICE_NAME, SitesServiceController } from '@app/protobuf';

import { Controller } from '@nestjs/common';
import { GrpcLogger } from './grpc.logger';
import { isDev } from '@valhalla/utilities';

@Controller()
@GrpcClass(SITES_SERVICE_NAME)
@LogClassMethods({
  when: isDev(),
  onTrigger: (fnName) => GrpcLogger.debug(`gRPC: ${fnName}`),
})
export class gRpcController implements SitesServiceController {}
