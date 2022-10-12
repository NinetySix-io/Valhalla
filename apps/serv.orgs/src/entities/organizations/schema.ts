import {
  BaseSchema,
  CaseInsensitiveIndex,
  SimpleModel,
  mongoose,
  typegoose,
} from '@valhalla/serv.core';
import { OrgPlan, OrgStatus } from '@app/protobuf';

@SimpleModel('organizations')
@CaseInsensitiveIndex({ name: 1 })
@typegoose.index({ slug: 1 })
@typegoose.index({ plan: 1 })
@typegoose.index({ inactiveAt: 1 })
export class OrganizationSchema extends BaseSchema {
  @typegoose.prop()
  name: string;

  @typegoose.prop()
  status: OrgStatus;

  @typegoose.prop()
  slug: string;

  @typegoose.prop()
  logoUrl?: string;

  @typegoose.prop({ required: true })
  plan: OrgPlan;

  @typegoose.prop()
  createdBy: mongoose.Types.ObjectId;

  @typegoose.prop()
  updatedBy: mongoose.Types.ObjectId;
}
