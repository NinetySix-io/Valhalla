import { Injectable } from '@nestjs/common';
import { InjectModel } from 'kindagoose';
import { BaseFactory, ModelType } from '@valhalla/serv.core';
import { SectionElementSchema } from './schemas';

@Injectable()
export class SectionElementsModel extends BaseFactory<SectionElementSchema> {
  constructor(
    @InjectModel(SectionElementSchema)
    model: ModelType<SectionElementSchema>,
  ) {
    super(model);
  }
}
