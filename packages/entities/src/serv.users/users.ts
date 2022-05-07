import { BaseEntity } from '../base';

export class UserEmail extends BaseEntity {
  value: string;

  isPrimary?: boolean;

  isVerified?: boolean;

  verificationCode?: string;
}

export class UserPhone extends BaseEntity {
  value: string;

  isPrimary?: boolean;

  isVerified?: boolean;

  verificationCode?: string;
}

export class User extends BaseEntity {
  displayName: string;

  firstName: string;

  lastName: string;

  emails: UserEmail[];

  phones: UserPhone[];
}
