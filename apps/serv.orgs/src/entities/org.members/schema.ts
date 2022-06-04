import { BaseSchema, SimpleModel } from '@valhalla/serv.core';

import mongoose from 'mongoose';
import { prop } from '@typegoose/typegoose';

export enum OrgMemberStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Rejected = 'rejected',
}

export enum OrgMemberRole {
  Owner = 'owner',
  Admin = 'admin',
  Developer = 'developer',
  Member = 'member',
  Guess = 'guest',
}

@SimpleModel('organization-members')
export class OrgMemberSchema extends BaseSchema {
  @prop()
  user: mongoose.Types.ObjectId;

  @prop()
  organization: mongoose.Types.ObjectId;

  @prop()
  invitedBy?: mongoose.Types.ObjectId;

  @prop()
  status: OrgMemberStatus;

  @prop()
  role: OrgMemberRole;
}
