import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { BaseFactory, ModelType } from '../_base/factory';
import { OrganizationSchema } from './schema';

@Injectable()
export class OrganizationsModel extends BaseFactory<OrganizationSchema> {
  constructor(
    @InjectModel(OrganizationSchema)
    model: ModelType<OrganizationSchema>,
  ) {
    super(model);
  }
}
