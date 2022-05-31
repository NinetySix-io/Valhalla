import { Boot, InjectBoot } from '@nestcloud2/boot';
import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class AccessJwtConfigService implements JwtOptionsFactory {
  constructor(@InjectBoot() private readonly boot: Boot) {}

  createJwtOptions(): JwtModuleOptions {
    const key = 'app.accessToken.jwt';
    const jwtConfig = this.boot.get<JwtModuleOptions>(key);
    return jwtConfig;
  }
}
