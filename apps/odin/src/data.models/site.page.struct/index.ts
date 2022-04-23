import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { BaseFactory, ModelType } from '@odin/data.models/_base/factory';
import { SitePageStructSchema } from './schema';

@Injectable()
export class SitePageStructsModel extends BaseFactory<SitePageStructSchema> {
  constructor(
    @InjectModel(SitePageStructSchema)
    model: ModelType<SitePageStructSchema>,
  ) {
    super(model);
  }
}
