import { Injectable } from '@nestjs/common';
import { InjectModel } from 'kindagoose';
import { BaseFactory, ModelType } from '@valhalla/serv.core';
import { SiteSchema } from './schema';

@Injectable()
export class SitesModel extends BaseFactory<SiteSchema> {
  constructor(
    @InjectModel(SiteSchema)
    model: ModelType<SiteSchema>,
  ) {
    super(model);
  }
}
