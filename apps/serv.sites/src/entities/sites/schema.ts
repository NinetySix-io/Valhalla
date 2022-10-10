import {
  BaseSchema,
  SimpleModel,
  mongoose,
  typegoose,
} from '@valhalla/serv.core';

import { SiteStatus } from '@app/protobuf';

@SimpleModel('sites')
@typegoose.index({ ownBy: 1, name: 1 }, { unique: true })
@typegoose.index({ status: 1 })
export class SiteSchema extends BaseSchema {
  @typegoose.prop()
  name: string;

  @typegoose.prop()
  status: SiteStatus;

  @typegoose.prop()
  url?: string;

  @typegoose.prop()
  createdBy: mongoose.Types.ObjectId;

  @typegoose.prop()
  updatedBy: mongoose.Types.ObjectId;

  @typegoose.prop()
  ownBy: mongoose.Types.ObjectId;
}
