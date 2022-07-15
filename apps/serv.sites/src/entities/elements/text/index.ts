import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { BaseFactory, ModelType } from '@valhalla/serv.core';
import { TextElementSchema } from './schema';

@Injectable()
export class TextElementsModel extends BaseFactory<TextElementSchema> {
  constructor(
    @InjectModel(TextElementSchema)
    model: ModelType<TextElementSchema>,
  ) {
    super(model);
  }
}
