import { HealthController } from './health.controller';
import { Module } from '@nestjs/common';
import { MongoDBHealthIndicator } from './indicators/mongodb.indicator';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [MongoDBHealthIndicator],
})
export class HealthModule {}
