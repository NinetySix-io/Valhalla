import { Boot, InjectBoot } from '@nestcloud2/boot';
import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(@InjectBoot() private readonly boot: Boot) {}

  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    const expires = this.boot.get<string>('app.jwtExpires');
    return {
      signOptions: {
        expiresIn: expires,
      },
    };
  }
}
