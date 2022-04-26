import { OrganizationSchema } from '@serv.odin/data.models/organizations/schema';
import { UserSchema } from '@serv.odin/data.models/users/schema';

declare module 'express' {
  interface Request {
    user: UserSchema['_id'];
    organization?: OrganizationSchema['_id'];
  }
}
