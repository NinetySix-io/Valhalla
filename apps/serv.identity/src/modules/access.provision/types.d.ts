import { AccountSchema } from '@app/entities/accounts/schema';
import { ServOrgs } from '@valhalla/serv.clients';

export type JwtContent = {
  activeOrg?: ServOrgs.Organization['id'];
  account: Pick<AccountSchema, 'displayName' | 'id'>;
};
