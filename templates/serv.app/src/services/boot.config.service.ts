import { Injectable } from '@nestjs/common';
import { ServAppConfigService } from '@valhalla/serv.core';

@Injectable()
export class BootConfigService extends ServAppConfigService {}
