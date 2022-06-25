import { ArchivePageHandler } from '@app/cqrs/commands/archive.page.command';
import { CreatePageHandler } from '@app/cqrs/commands/create.page.command';
import { CreateSiteHandler } from '@app/cqrs/commands/create.site.command';
import { DeletePageHandler } from '@app/cqrs/commands/delete.page.command';
import { GetPageHandler } from '@app/cqrs/queries/get.page.query';
import { GetPageListHandler } from '@app/cqrs/queries/get.page.list.query';
import { GetSiteHandler } from '@app/cqrs/queries/get.site.query';
import { GetSiteListHandler } from '@app/cqrs/queries/get.site.list.query';
import { Module } from '@nestjs/common';
import { PageSchema } from '@app/entities/pages/schema';
import { PagesModel } from '@app/entities/pages';
import { SiteSchema } from '@app/entities/sites/schema';
import { SitesModel } from '@app/entities/sites';
import { SuspendSiteHandler } from '@app/cqrs/commands/suspend.site.command';
import { TypegooseModule } from 'nestjs-typegoose';
import { UpdatePageHandler } from '@app/cqrs/commands/update.page.command';
import { UpdateSiteHandler } from '@app/cqrs/commands/update.site.command';
import { gRpcController } from './grpc.controller';

@Module({
  imports: [TypegooseModule.forFeature([SiteSchema, PageSchema])],
  controllers: [gRpcController],
  providers: [
    SitesModel,
    PagesModel,
    // -----------------------------
    // Command Handlers
    // -----------------------------
    ArchivePageHandler,
    CreatePageHandler,
    CreateSiteHandler,
    DeletePageHandler,
    SuspendSiteHandler,
    UpdatePageHandler,
    UpdateSiteHandler,

    // -----------------------------
    // Query Handlers
    // -----------------------------
    GetPageListHandler,
    GetPageHandler,
    GetSiteHandler,
    GetSiteListHandler,
  ],
})
export class gRpcModule {}
