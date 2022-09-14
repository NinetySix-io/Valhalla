import { Injectable } from '@nestjs/common';
import { InjectModel } from 'kindagoose';
import { BaseFactory, ModelType } from '@valhalla/serv.core';
import { BoxElementSchema } from './schema';

@Injectable()
export class BoxElementsModel extends BaseFactory<BoxElementSchema> {
  constructor(
    @InjectModel(BoxElementSchema)
    model: ModelType<BoxElementSchema>,
  ) {
    super(model);
  }
}
