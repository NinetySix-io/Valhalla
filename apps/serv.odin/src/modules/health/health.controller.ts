import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

import { ApiTags } from '@nestjs/swagger';
import { MongoDBHealthIndicator } from './indicators/mongodb.indicator';

@Controller('health')
@ApiTags('Health API')
export class HealthController {
  constructor(
    private readonly healthService: HealthCheckService,
    private readonly memoryHealth: MemoryHealthIndicator,
    private readonly diskHealth: DiskHealthIndicator,
    private readonly mongoHealth: MongoDBHealthIndicator,
  ) {}

  @Get('/')
  @HealthCheck()
  checkHealth() {
    return this.healthService.check([
      () => this.mongoHealth.checkDatabase(),
      // the process should not use more than 300MB memory
      () => this.memoryHealth.checkHeap('memory heap', 300 * 1024 * 1024),
      // The process should not have more than 300MB RSS memory allocated
      () => this.memoryHealth.checkRSS('memory RSS', 300 * 1024 * 1024),
    ]);
  }
}
