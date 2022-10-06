import { Global, Module, ModuleMetadata } from '@nestjs/common';

import { KindagooseModule } from 'kindagoose';
import { PageElementSchema } from './page.elements/schemas';
import { PageElementTextSchema } from './page.elements/variants/text.variant';
import { PageElementsModel } from './page.elements';
import { PageSchema } from './pages/schemas';
import { PagesModel } from './pages';
import { SiteSchema } from './sites/schema';
import { SitesModel } from './sites';

const ModelProviders: ModuleMetadata['providers'] = [
  SitesModel,
  PagesModel,
  PageElementsModel,
];

@Global()
@Module({
  imports: [
    KindagooseModule.forFeature([
      SiteSchema,
      PageSchema,
      {
        schema: PageElementSchema,
        discriminators: [PageElementTextSchema],
      },
    ]),
  ],
  providers: ModelProviders,
  exports: ModelProviders,
})
export class DbEntitiesModule {}
