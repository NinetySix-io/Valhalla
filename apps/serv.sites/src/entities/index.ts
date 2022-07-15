import { Global, Module, ModuleMetadata } from '@nestjs/common';

import { BoxElementSchema } from './elements/boxes/schema';
import { BoxElementsModel } from './elements/boxes';
import { ComponentSchema } from './components/schema';
import { ComponentsModel } from './components';
import { ElementSchema } from './elements/schemas/element.schema';
import { ElementType } from '@app/protobuf';
import { ElementsModel } from './elements';
import { PageSchema } from './pages/schema';
import { PagesModel } from './pages';
import { SiteSchema } from './sites/schema';
import { SitesModel } from './sites';
import { TextElementSchema } from './elements/text/schema';
import { TextElementsModel } from './elements/text';
import { TypegooseModule } from 'nestjs-typegoose';

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
    TypegooseModule.forFeature([
      SiteSchema,
      PageSchema,
      ComponentSchema,
      {
        typegooseClass: ElementSchema,
        discriminators: [
          {
            typegooseClass: BoxElementSchema,
            discriminatorId: ElementType.Box,
          },
          {
            typegooseClass: TextElementSchema,
            discriminatorId: ElementType.Text,
          },
        ],
      },
    ]),
  ],
  providers: [...ModelProviders],
  exports: [...ModelProviders],
})
export class DbEntitiesModule {}
