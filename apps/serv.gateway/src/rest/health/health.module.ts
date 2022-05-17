import { Module } from '@nestjs/common';
import { RestHealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  controllers: [RestHealthController],
  providers: [],
})
export class RestHealthModule {}
