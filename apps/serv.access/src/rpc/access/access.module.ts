import { AccessProvisionService } from '@app/services/access.provision.service';
import { CreateAccessHandler } from '@app/rpc/access/commands/create.access.command';
import { DecodeAccessTokenHandler } from './commands/decode.access.token.command';
import { DeleteRefreshTokenHandler } from '@app/rpc/access/commands/delete.refresh.token.command';
import { Module } from '@nestjs/common';
import { ReadAccessHandler } from './queries/read.access.query';
import { RenewAccessTokenHandler } from './commands/renew.access.token.command';
import { RpcAccessController } from './access.controller';

@Module({
  imports: [AccessProvisionService],
  controllers: [RpcAccessController],
  providers: [
    ReadAccessHandler,
    CreateAccessHandler,
    DeleteRefreshTokenHandler,
    RenewAccessTokenHandler,
    DecodeAccessTokenHandler,
  ],
})
export class RpcAccessModule {}
