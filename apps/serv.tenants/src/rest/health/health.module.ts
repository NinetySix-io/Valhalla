import { BootConfigService } from '@serv.tenants/services/boot.config.service';
import { Module } from '@nestjs/common';
import { RestHealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  controllers: [RestHealthController],
  providers: [BootConfigService],
})
export class RestHealthModule {}
