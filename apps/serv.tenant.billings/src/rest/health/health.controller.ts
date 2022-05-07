import { Controller, Get } from '@nestjs/common';
import {
  GRPCHealthIndicator,
  HealthCheck,
  HealthCheckService,
} from '@nestjs/terminus';
import {
  TENANT_BILLINGS_SERVICE_NAME,
  protobufPackage,
} from '@serv.tenant.billings/protobuf/tenant.billing';

import { GrpcOptions } from '@nestjs/microservices';
import { protoPath } from '@serv.tenant.billings/constants';

@Controller('health')
export class RestHealthController {
  constructor(
    private health: HealthCheckService,
    private grpc: GRPCHealthIndicator,
  ) {}

  /**
   * It returns a function that checks the availability of the gRPC service
   * @returns A function that returns a promise.
   */
  private checkGrpc() {
    return () =>
      this.grpc.checkService<GrpcOptions>(
        TENANT_BILLINGS_SERVICE_NAME,
        protobufPackage,
        {
          package: protobufPackage,
          healthServiceName: TENANT_BILLINGS_SERVICE_NAME,
          healthServiceCheck: async () => ({ status: 1 }),
          protoPath,
          timeout: 2000,
          url: `0.0.0.0:3103`,
        },
      );
  }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([this.checkGrpc()]);
  }
}
