import { BaseFactory, ModelType } from '@valhalla/serv.core/src';
import { AccessTokenSchema } from './schema';
import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccessTokensModel extends BaseFactory<AccessTokenSchema> {
  constructor(
    @InjectModel(AccessTokenSchema)
    model: ModelType<AccessTokenSchema>,
  ) {
    super(model);
  }
}
