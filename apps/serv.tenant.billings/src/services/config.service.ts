import { ConfigValue } from '@nestcloud2/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  @ConfigValue('service.port', 3003)
  public readonly PORT: number;
}
