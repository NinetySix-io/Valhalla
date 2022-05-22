import { Field, ObjectType } from '@nestjs/graphql';

import { SessionResponse } from './session.response';

@ObjectType()
export class UserLoginResponse {
  @Field({ description: 'Session Information' })
  session!: SessionResponse;

  @Field({ description: 'Logged in User ID' })
  userId!: string;
}
