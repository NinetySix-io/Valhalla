import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { BaseFactory, ModelType } from '@valhalla/serv.core';
import { ElementSchema } from './schema';

@Injectable()
export class ElementsModel extends BaseFactory<ElementSchema> {
  constructor(
    @InjectModel(ElementSchema)
    model: ModelType<ElementSchema>,
  ) {
    super(model);
  }
}
