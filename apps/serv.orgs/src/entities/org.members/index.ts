import { Injectable } from '@nestjs/common';
import { BaseFactory, ModelType } from '@valhalla/serv.core';
import { InjectModel } from 'kindagoose';
import { OrgMemberSchema } from './schema';

@Injectable()
export class OrgMembersModel extends BaseFactory<OrgMemberSchema> {
  constructor(
    @InjectModel(OrgMemberSchema)
    model: ModelType<OrgMemberSchema>,
  ) {
    super(model);
  }
}
