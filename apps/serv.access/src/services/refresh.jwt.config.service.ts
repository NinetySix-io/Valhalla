import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { InjectConfig } from '@nestcloud2/config';
import { ConsulConfig } from '@nestcloud2/config/config.consul';

@Injectable()
export class RefreshJwtConfigService implements JwtOptionsFactory {
  constructor(@InjectConfig() private readonly config: ConsulConfig) {}

  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    const key = 'app.auth.jwt';
    const jwtConfig = this.config.get<JwtModuleOptions>(key);
    return jwtConfig;
  }
}
