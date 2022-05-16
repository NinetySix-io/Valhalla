import { User as UserProto } from '@serv.users/protobuf/users';
import { UserSchema } from './schema';

export class UserTransformer {
  user: UserSchema;

  constructor(user: UserSchema) {
    this.user = user;
  }

  get proto(): UserProto {
    return {
      id: this.user.id,
      displayName: this.user.displayName,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      createdAt: this.user.createdAt.toString(),
      updatedAt: this.user.updatedAt.toString(),
      emails: this.user.emails.map((email) => ({
        id: email.id,
        isPrimary: email.isPrimary,
        value: email.value,
        isVerified: email.isVerified,
        verificationCode: email.verificationCode,
        createdAt: email.createdAt.toString(),
        updatedAt: email.updatedAt.toString(),
      })),
      phones: this.user.phones.map((phone) => ({
        id: phone.id,
        isPrimary: phone.isPrimary,
        value: phone.value,
        isVerified: phone.isVerified,
        verificationCode: phone.verificationCode,
        createdAt: phone.createdAt.toString(),
        updatedAt: phone.updatedAt.toString(),
      })),
    };
  }
}
