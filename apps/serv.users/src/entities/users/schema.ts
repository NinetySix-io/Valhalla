import { BaseSchema, SimpleModel } from '@valhalla/serv.core';
import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { timestamps: true } })
export class UserEmailSchema extends BaseSchema {
  @prop()
  value: string;

  @prop()
  isPrimary?: boolean;

  @prop()
  isVerified?: boolean;

  @prop()
  verificationCode?: string;
}

@modelOptions({ schemaOptions: { timestamps: true } })
export class UserPhoneSchema extends BaseSchema {
  @prop()
  value: string;

  @prop()
  isPrimary?: boolean;

  @prop()
  isVerified?: boolean;

  @prop()
  verificationCode?: string;
}

@SimpleModel('users')
export class UserSchema extends BaseSchema {
  @prop()
  displayName: string;

  @prop()
  firstName: string;

  @prop()
  lastName: string;

  @prop({ _id: true, type: [UserEmailSchema] })
  emails: UserEmailSchema[];

  @prop({ _id: true, type: [UserPhoneSchema] })
  phones: UserPhoneSchema[];
}
