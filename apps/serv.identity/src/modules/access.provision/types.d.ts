import { AccountSchema } from '@app/entities/accounts/schema';

export type JwtContent = {
  account: Pick<AccountSchema, 'displayName' | 'id'>;
};
