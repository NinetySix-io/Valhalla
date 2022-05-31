import { IdentityRpcClientService } from '@valhalla/serv.clients';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TokensStrategy } from '../passport/token.strategy';

@Module({
  exports: [],
  imports: [PassportModule.register({ defaultStrategy: TokensStrategy.key })],
  providers: [TokensStrategy, IdentityRpcClientService],
})
export class AuthModule {}
