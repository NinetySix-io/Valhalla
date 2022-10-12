import { ServOrgs } from '@valhalla/serv.clients';

export type JwtContent = {
  account: {
    id: string;
  };
  organization?: {
    id: ServOrgs.Organization['id'];
    role: ServOrgs.Member['role'];
  };
};
