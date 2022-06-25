import { Global } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common';
import { PageSchema } from './pages/schema';
import { PagesModel } from './pages';
import { SiteSchema } from './sites/schema';
import { SitesModel } from './sites';
import { TypegooseModule } from 'nestjs-typegoose';

const ModelProviders: ModuleMetadata['providers'] = [SitesModel, PagesModel];

@Global()
@Module({
  imports: [TypegooseModule.forFeature([SiteSchema, PageSchema])],
  providers: [...ModelProviders],
  exports: [...ModelProviders],
})
export class DbEntitiesModule {}
