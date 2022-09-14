import { BootConfigService } from '@app/services/boot.config.service';
import { Module } from '@nestjs/common';

@Module({
  exports: [BootConfigService],
  providers: [BootConfigService],
})
export class ConfigModule {}
