import { Injectable } from '@nestjs/common';
import { InjectModel } from 'kindagoose';
import { BaseFactory, ModelType } from '@valhalla/serv.core';
import { PageElementSchema } from './schemas';

@Injectable()
export class PageElementsModel extends BaseFactory<PageElementSchema> {
  constructor(
    @InjectModel(PageElementSchema)
    model: ModelType<PageElementSchema>,
  ) {
    super(model);
  }
}
