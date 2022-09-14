import { Injectable } from '@nestjs/common';
import { InjectModel } from 'kindagoose';
import { BaseFactory, ModelType } from '@valhalla/serv.core';
import { ComponentSchema } from './schema';

@Injectable()
export class ComponentsModel extends BaseFactory<ComponentSchema> {
  constructor(
    @InjectModel(ComponentSchema)
    model: ModelType<ComponentSchema>,
  ) {
    super(model);
  }
}
