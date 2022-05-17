import { AccessTokenSchema } from '@app/entities/access.tokens/schema';
import { AccessTokensModel } from '@app/entities/access.tokens';
import { CreateAccessHandler } from '@app/rpc/access/commands/create.access.command';
import { DeleteAccessHandler } from '@app/rpc/access/commands/delete.access.command';
import { FindAccessHandler } from '@app/rpc/access/queries/find.access.query';
import { HasRightsHandler } from '@app/rpc/access/queries/has.rights.query';
import { Module } from '@nestjs/common';
import { ReadAccessHandler } from '@app/rpc/access/queries/read.access.query';
import { RpcAccessController } from './access.controller';
import { TypegooseModule } from 'nestjs-typegoose';

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
