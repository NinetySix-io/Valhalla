import { AccessProvisionService } from '@app/services/access.provision.service';
import { CreateAccessHandler } from '@app/rpc/access/commands/create.access.command';
import { DecodeAccessTokenHandler } from './commands/decode.access.token.command';
import { DeleteRefreshTokenHandler } from '@app/rpc/access/commands/delete.refresh.token.command';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ReadAccessHandler } from './queries/read.access.query';
import { RefreshJwtConfigService } from '@app/services/refresh.jwt.config.service';
import { RefreshTokenSchema } from '@app/entities/refresh.tokens/schema';
import { RefreshTokensModel } from '@app/entities/refresh.tokens';
import { RenewAccessTokenHandler } from './commands/renew.access.token.command';
import { RpcAccessController } from './access.controller';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forFeature([RefreshTokenSchema]),
    JwtModule.registerAsync({
      useClass: RefreshJwtConfigService,
    }),
  ],
  controllers: [RpcAccessController],
  providers: [
    RefreshTokensModel,
    AccessProvisionService,
    ReadAccessHandler,
    CreateAccessHandler,
    DeleteRefreshTokenHandler,
    RenewAccessTokenHandler,
    DecodeAccessTokenHandler,
  ],
})
export class RpcAccessModule {}
