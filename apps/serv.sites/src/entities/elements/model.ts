import { Injectable } from '@nestjs/common';
import { InjectModel } from 'kindagoose';
import { BaseFactory, ModelType } from '@valhalla/serv.core';
import { ElementSchema } from './schemas/element.schema';

@Injectable()
export class ElementsModel extends BaseFactory<ElementSchema> {
  constructor(
    @InjectModel(ElementSchema)
    model: ModelType<ElementSchema>,
  ) {
    super(model);
  }
}
