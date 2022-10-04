import { Injectable } from '@nestjs/common';
import { InjectModel } from 'kindagoose';
import { BaseFactory, ModelType } from '@valhalla/serv.core';
import { SectionSchema } from './schemas';

@Injectable()
export class SectionsModel extends BaseFactory<SectionSchema> {
  constructor(
    @InjectModel(SectionSchema)
    model: ModelType<SectionSchema>,
  ) {
    super(model);
  }
}
