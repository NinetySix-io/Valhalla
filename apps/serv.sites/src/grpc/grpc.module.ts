import { CreateSiteHandler } from '@app/cqrs/commands/create.site.command';
import { GetSiteHandler } from '@app/cqrs/queries/get.site.query';
import { GetSiteListHandler } from '@app/cqrs/queries/get.site.list.query';
import { Module } from '@nestjs/common';
import { SiteSchema } from '@app/entities/sites/schema';
import { SitesModel } from '@app/entities/sites';
import { TypegooseModule } from 'nestjs-typegoose';
import { gRpcController } from './grpc.controller';

@Module({
  imports: [TypegooseModule.forFeature([SiteSchema])],
  controllers: [gRpcController],
  providers: [
    SitesModel,

    CreateSiteHandler,
    GetSiteHandler,
    GetSiteListHandler,
  ],
})
export class gRpcModule {}
