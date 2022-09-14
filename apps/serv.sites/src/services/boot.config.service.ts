import { Injectable } from '@nestjs/common';
import { ServAppConfigService } from '@valhalla/serv.core';

@Injectable()
export class BootConfigService extends ServAppConfigService {
  get mongodbUri(): string {
    return this.boot.get('mongodb.uri');
  }
}
