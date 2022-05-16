import { BaseEntity } from '../base';

export class AccessToken extends BaseEntity {
  name: string;

  tenant?: string;

  expiresAt?: Date;

  scopes?: string[];

  active: boolean;

  createdBy: string;
}
