import { Global, Module, ModuleMetadata } from '@nestjs/common';

import { ComponentSchema } from './components/schema';
import { ComponentsModel } from './components';
import { PageSchema } from './pages/schema';
import { PagesModel } from './pages';
import { SiteSchema } from './sites/schema';
import { SitesModel } from './sites';
import { TypegooseModule } from 'nestjs-typegoose';

const ModelProviders: ModuleMetadata['providers'] = [
  SitesModel,
  PagesModel,
  ComponentsModel,
];

@Global()
@Module({
  imports: [
    TypegooseModule.forFeature([SiteSchema, PageSchema, ComponentSchema]),
  ],
  providers: [...ModelProviders],
  exports: [...ModelProviders],
})
export class DbEntitiesModule {}
