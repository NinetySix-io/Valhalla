import { BaseFactory, ModelType } from '@valhalla/serv.core';
import { OrgSchema } from './schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class OrgsModel extends BaseFactory<OrgSchema> {
  constructor(
    @InjectModel(OrgSchema)
    model: ModelType<OrgSchema>,
  ) {
    super(model);
  }
}
