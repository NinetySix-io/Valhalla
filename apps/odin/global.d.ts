import { OrganizationSchema } from '@odin/data.models/organizations/schema';
import { UserSchema } from '@odin/data.models/users/schema';

declare module 'express' {
  interface Request {
    user: UserSchema['_id'];
    organization?: OrganizationSchema['_id'];
  }
}
