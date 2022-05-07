import { BaseSchema, SimpleModel } from '@valhalla/serv.core';

import mongoose from 'mongoose';
import { prop } from '@typegoose/typegoose';

export enum TenantMemberStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Rejected = 'rejected',
}

export enum TenantMemberRole {
  Owner = 'owner',
  Admin = 'admin',
  Developer = 'developer',
  Member = 'member',
  Guess = 'guest',
}

@SimpleModel('tenant-members')
export class TenantMemberSchema extends BaseSchema {
  @prop()
  user: mongoose.Types.ObjectId;

  @prop()
  tenant: mongoose.Types.ObjectId;

  @prop()
  invitedBy?: mongoose.Types.ObjectId;

  @prop()
  status: TenantMemberStatus;

  @prop()
  role: TenantMemberRole;
}
