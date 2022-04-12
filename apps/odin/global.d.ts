import { UserSchema } from '@odin/data.models/users/schema';
import mongoose from 'mongoose';

declare namespace Express {
  export interface Request {
    user: {
      userId: UserSchema['_id'];
      jwt?: string;
    };
  }
}
