import { Boot, InjectBoot } from '@nestcloud2/boot';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BootConfigService {
  constructor(@InjectBoot() private readonly boot: Boot) {}

  get port(): number {
    return this.boot.get('service.port');
  }

  get gRpcPort(): number {
    return this.boot.get('grpc.port');
  }

  private get _host(): string {
    return this.boot.get('service.discoveryHost');
  }

  public get host(): string {
    if (process.env.NODE_ENV !== 'production') {
      return '0.0.0.0';
    }

    return this._host;
  }
}
