import { Injectable } from '@nestjs/common';
import { InjectConfig } from '@nestcloud2/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConsulConfig } from '@nestcloud2/config/config.consul';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(@InjectConfig() private readonly config: ConsulConfig) {}

  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    const key = 'app.auth.jwtSettings';
    const jwtConstants = this.config.get<JwtModuleOptions>(key);
    return {
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '40000s',
      },
    };
  }
}
