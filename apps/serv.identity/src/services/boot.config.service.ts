import { Injectable } from '@nestjs/common';
import { ServAppConfigService } from '@valhalla/serv.core';
import dayjs from 'dayjs';
import { generateVerificationCode } from '@app/lib/generate.verification.code';
import ms from 'ms';

@Injectable()
export class BootConfigService extends ServAppConfigService {
  get mongodbUri(): string {
    return this.boot.get('mongodb.uri');
  }

  get passwordExpires(): string {
    return this.boot.get('app.passwordExpires', '1h');
  }

  get verificationSalt(): number {
    return this.boot.get('app.verificationCode.salt', 10);
  }

  get refreshTokenExpiry(): Date {
    const milliseconds = ms(this.boot.get('app.refreshToken.expiresIn', '90d'));
    return dayjs().add(milliseconds, 'milliseconds').toDate();
  }

  get accessTokenExpiry(): string {
    return this.boot.get('app.accessToken.jwt.signOptions.expiresIn', '8h');
  }

  get verificationCode(): string {
    const length: number = this.boot.get('app.verificationCode.length', 6);
    return generateVerificationCode(length);
  }
}
