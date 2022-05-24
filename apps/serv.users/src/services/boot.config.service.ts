import { Injectable } from '@nestjs/common';
import { ServAppConfigService } from '@valhalla/serv.core';

@Injectable()
export class BootConfigService extends ServAppConfigService {
  get passwordExpires(): string {
    return this.boot.get('app.passwordExpires', '1h');
  }

  get jwtExpires(): string {
    return this.boot.get('app.jwtExpires', '1h');
  }

  get passwordHashRounds(): number {
    return this.boot.get('app.passwordHashRound', 10);
  }
}
