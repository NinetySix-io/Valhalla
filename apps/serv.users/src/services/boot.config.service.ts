import { BootValue } from '@nestcloud2/boot';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BootConfigService {
  @BootValue('service.port')
  public readonly port: number;

  @BootValue('grpc.port')
  public readonly gRpcPort: number;

  @BootValue('app.passwordExpires', '1h')
  public readonly passwordExpires: string;

  @BootValue('app.jwtExpires', '1h')
  public readonly jwtExpires: string;

  @BootValue('app.passwordHashRound')
  public readonly passwordHashRounds: number;

  @BootValue('service.discoveryHost')
  public readonly _host: string;

  public get host(): string {
    if (process.env.NODE_ENV !== 'production') {
      return '0.0.0.0';
    }

    return this._host;
  }
}