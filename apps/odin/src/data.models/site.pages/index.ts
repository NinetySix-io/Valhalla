import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { BaseFactory, ModelType } from '@odin/data.models/_base/factory';
import { SitePageSchema } from './schema';

@Injectable()
export class SitePagesModel extends BaseFactory<SitePageSchema> {
  constructor(
    @InjectModel(SitePageSchema)
    model: ModelType<SitePageSchema>,
  ) {
    super(model);
  }
}
