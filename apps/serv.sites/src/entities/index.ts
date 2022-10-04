import { Global, Module, ModuleMetadata } from '@nestjs/common';

import { KindagooseModule } from 'kindagoose';
import { PageSchema } from './pages/schemas';
import { PagesModel } from './pages';
import { SectionElementSchema } from './section.elements/schemas';
import { SectionElementsModel } from './section.elements';
import { SectionSchema } from './sections/schemas';
import { SectionsModel } from './sections';
import { SiteSchema } from './sites/schema';
import { SitesModel } from './sites';

const ModelProviders: ModuleMetadata['providers'] = [
  SitesModel,
  PagesModel,
  SectionsModel,
  SectionElementsModel,
];

@Global()
@Module({
  imports: [
    KindagooseModule.forFeature([
      SiteSchema,
      PageSchema,
      SectionSchema,
      SectionElementSchema,
    ]),
  ],
  providers: ModelProviders,
  exports: ModelProviders,
})
export class DbEntitiesModule {}
