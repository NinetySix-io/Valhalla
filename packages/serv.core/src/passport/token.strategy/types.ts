import { ServIdentity } from '@valhalla/serv.clients';

export type AuthContent = {
  activeOrg?: string;
  account: AuthAccount;
};

export type AuthAccount = NonNullable<
  ServIdentity.DecodeAccessTokenResponse['account']
>;

export default null;
