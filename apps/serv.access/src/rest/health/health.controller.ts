import { ACCESS_SERVICE_NAME, protobufPackage } from '@app/rpc/protobuf/access';
import { Controller, Get } from '@nestjs/common';
import {
  GRPCHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HealthIndicatorFunction,
} from '@nestjs/terminus';

import { BootConfigService } from '@app/services/boot.config.service';
import { GrpcOptions } from '@nestjs/microservices';
import { protoPath } from '@app/constants';

@Controller('health')
export class RestHealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly grpc: GRPCHealthIndicator,
    private readonly bootConfig: BootConfigService,
  ) {}

  /**
   * It returns a function that checks the health of the gRPC service
   * @returns A function that returns a promise that resolves to a HealthIndicatorResult
   */
  private checkGrpc(): HealthIndicatorFunction {
    return () =>
      this.grpc.checkService<GrpcOptions>(
        ACCESS_SERVICE_NAME,
        protobufPackage,
        {
          package: protobufPackage,
          healthServiceName: ACCESS_SERVICE_NAME,
          healthServiceCheck: async () => ({ status: 1 }),
          protoPath,
          timeout: 2000,
          url: this.bootConfig.gRpcUrl,
        },
      );
  }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([this.checkGrpc()]);
  }
}
