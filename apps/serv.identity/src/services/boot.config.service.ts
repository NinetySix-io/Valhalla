import { Injectable } from '@nestjs/common';
import { ServAppConfigService } from '@valhalla/serv.core';
import dayjs from 'dayjs';
import ms from 'ms';

@Injectable()
export class BootConfigService extends ServAppConfigService {
  get passwordExpires(): string {
    return this.boot.get('app.passwordExpires', '1h');
  }

  get passwordHashRounds(): number {
    return this.boot.get('app.passwordHashRound', 10);
  }

  get refreshTokenExpiry(): Date {
    const milliseconds = ms(this.boot.get('app.refreshToken.expiresIn', '90d'));
    return dayjs().add(milliseconds, 'milliseconds').toDate();
  }
}
