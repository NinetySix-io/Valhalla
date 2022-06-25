import { CqrsProviderModule } from '@valhalla/serv.core';
import { Module } from '@nestjs/common';
import { PageSchema } from '@app/entities/pages/schema';
import { PagesModel } from '@app/entities/pages';
import { SiteSchema } from '@app/entities/sites/schema';
import { SitesModel } from '@app/entities/sites';
import { TypegooseModule } from 'nestjs-typegoose';
import { gRpcController } from './grpc.controller';
import path from 'path';

@Module({
  controllers: [gRpcController],
  imports: [
    CqrsProviderModule.forRootAsync(path.resolve(__dirname, '../cqrs'), {
      imports: [TypegooseModule.forFeature([SiteSchema, PageSchema])],
      providers: [SitesModel, PagesModel],
    }),
  ],
})
export class gRpcModule {}
