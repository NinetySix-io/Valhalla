import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';

import { Injectable } from '@nestjs/common';
import { mongoose } from '@typegoose/typegoose';
import { promiseTimeout } from '@nestjs/terminus/dist/utils';

@Injectable()
export class MongoDBHealthIndicator extends HealthIndicator {
  constructor() {
    super();
  }

  private get key() {
    return 'mongodb';
  }

  private get Error() {
    return new HealthCheckError(
      'MongoDBHealthIndicator failed',
      this.getStatus(this.key, false),
    );
  }

  private checkConnection() {
    if (!mongoose.connection) {
      throw this.Error;
    }
  }

  private async pingDb(timeout: number) {
    const promise =
      mongoose.connection.readyState === 1
        ? Promise.resolve()
        : Promise.reject();

    return await promiseTimeout(timeout, promise);
  }

  async pingCheck(timeout = 1000) {
    try {
      await this.pingDb(timeout);
    } catch (error) {
      throw this.Error;
    }
  }

  async checkDatabase(): Promise<HealthIndicatorResult> {
    this.checkConnection();
    await this.pingCheck();
    return this.getStatus(this.key, true);
  }
}
