import { Global, Module, ModuleMetadata } from '@nestjs/common';

import { BoxElementSchema } from './elements/boxes/schema';
import { BoxElementsModel } from './elements/boxes';
import { ComponentSchema } from './components/schema';
import { ComponentsModel } from './components';
import { ElementSchema } from './elements/schemas/element.schema';
import { ElementsModel } from './elements';
import { KindagooseModule } from 'kindagoose';
import { PageSchema } from './pages/schema';
import { PagesModel } from './pages';
import { SiteSchema } from './sites/schema';
import { SitesModel } from './sites';
import { TextElementSchema } from './elements/text/schema';
import { TextElementsModel } from './elements/text';

const ModelProviders: ModuleMetadata['providers'] = [
  SitesModel,
  PagesModel,
  ComponentsModel,
  ElementsModel,
  BoxElementsModel,
  TextElementsModel,
];

@Global()
@Module({
  imports: [
    KindagooseModule.forFeature([
      SiteSchema,
      PageSchema,
      ComponentSchema,
      {
        schema: ElementSchema,
        discriminators: [BoxElementSchema, TextElementSchema],
      },
    ]),
  ],
  providers: [...ModelProviders],
  exports: [...ModelProviders],
})
export class DbEntitiesModule {}
