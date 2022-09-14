import { Injectable } from '@nestjs/common';
import { BaseFactory, ModelType } from '@valhalla/serv.core';
import { InjectModel } from 'kindagoose';
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
