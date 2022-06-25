import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { BaseFactory, ModelType } from '@valhalla/serv.core';
import { PageSchema } from './schema';

@Injectable()
export class PagesModel extends BaseFactory<PageSchema> {
  constructor(
    @InjectModel(PageSchema)
    model: ModelType<PageSchema>,
  ) {
    super(model);
  }
}
