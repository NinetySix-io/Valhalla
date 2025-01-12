import { Injectable } from '@nestjs/common';
import { InjectModel } from 'kindagoose';
import { BaseFactory, ModelType } from '@valhalla/serv.core';
import { PageSchema } from './schemas';

@Injectable()
export class PagesModel extends BaseFactory<PageSchema> {
  constructor(
    @InjectModel(PageSchema)
    model: ModelType<PageSchema>,
  ) {
    super(model);
  }
}
