import { BootConfigService } from '@app/services/boot.config.service';
import { HealthController } from './health.controller';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [BootConfigService],
})
export class HealthModule {}
