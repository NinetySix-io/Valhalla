import { AccountSchema } from '@app/entities/accounts/schema';
import { ServOrgs } from '@valhalla/serv.clients';

export type JwtContent = {
  account: Pick<AccountSchema, 'displayName' | 'id'>;
  organization?: {
    id: ServOrgs.Organization['id'];
    role: ServOrgs.Member['role'];
  };
};
