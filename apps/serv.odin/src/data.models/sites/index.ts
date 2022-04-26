import { InjectModel } from 'nestjs-typegoose';
import { BaseFactory, ModelType } from '../_base/factory';
import { SiteSchema } from './schema';

export class SitesModel extends BaseFactory<SiteSchema> {
  constructor(@InjectModel(SiteSchema) model: ModelType<SiteSchema>) {
    super(model);
  }
}
