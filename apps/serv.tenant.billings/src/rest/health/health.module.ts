import { ConfigService } from '@serv.tenant.billings/services/config.service';
import { Module } from '@nestjs/common';
import { RestHealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  controllers: [RestHealthController],
  providers: [ConfigService],
})
export class RestHealthModule {}
