import { Module } from '@nestjs/common';
import { AccessTokensModel } from '@serv.access/entities/access.tokens';
import { AccessTokenSchema } from '@serv.access/entities/access.tokens/schema';
import { CreateAccessHandler } from '@serv.access/rpc/access/commands/create.access.command';
import { DeleteAccessHandler } from '@serv.access/rpc/access/commands/delete.access.command';
import { FindAccessHandler } from '@serv.access/rpc/access/queries/find.access.query';
import { HasRightsHandler } from '@serv.access/rpc/access/queries/has.rights.query';
import { ReadAccessHandler } from '@serv.access/rpc/access/queries/read.access.query';
import { TypegooseModule } from 'nestjs-typegoose';
import { RpcAccessController } from './access.controller';

@Module({
  imports: [TypegooseModule.forFeature([AccessTokenSchema])],
  controllers: [RpcAccessController],
  providers: [
    // DATABASE MODELS
    AccessTokensModel,

    // HANDLERS
    CreateAccessHandler,
    DeleteAccessHandler,
    ReadAccessHandler,
    FindAccessHandler,
    HasRightsHandler,
  ],
})
export class RpcAccessModule {}
