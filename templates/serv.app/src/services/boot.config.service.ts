import { Injectable } from '@nestjs/common';
import { ServAppConfigService } from '@valhalla/serv.core/src';

@Injectable()
export class BootConfigService extends ServAppConfigService {}
