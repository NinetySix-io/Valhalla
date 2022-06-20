import { SITES_SERVICE_NAME, SitesServiceController } from '@app/protobuf';

import { Controller } from '@nestjs/common';
import { GrpcClass } from '@valhalla/serv.core';

@Controller()
@GrpcClass(SITES_SERVICE_NAME)
export class gRpcController implements SitesServiceController {}
