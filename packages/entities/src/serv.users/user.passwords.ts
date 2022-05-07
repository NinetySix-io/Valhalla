import { BaseEntity } from '../base';


export class UserPassword extends BaseEntity {
  user: string;

  hashed: string;

  expiredAt?: Date;
}
