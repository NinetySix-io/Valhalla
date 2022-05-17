import { Controller, Get } from '@nestjs/common';
import {
  GRPCHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HealthIndicatorFunction,
} from '@nestjs/terminus';
import { USERS_SERVICE_NAME, protobufPackage } from '@app/protobuf/users';

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

  private get grpcUrl(): string {
    return `${this.bootConfig.host}:${this.bootConfig.gRpcPort}`;
  }

  /**
   * It returns a function that checks the health of the gRPC service
   * @returns A function that returns a promise that resolves to a HealthIndicatorResult
   */
  private checkGrpc(): HealthIndicatorFunction {
    return () =>
      this.grpc.checkService<GrpcOptions>(USERS_SERVICE_NAME, protobufPackage, {
        package: protobufPackage,
        healthServiceName: USERS_SERVICE_NAME,
        healthServiceCheck: async () => ({ status: 1 }),
        protoPath,
        timeout: 2000,
        url: this.grpcUrl,
      });
  }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([this.checkGrpc()]);
  }
}