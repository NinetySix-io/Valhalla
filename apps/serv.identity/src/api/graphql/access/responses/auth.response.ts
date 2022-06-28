import { Field, ObjectType } from '@nestjs/graphql';

import { TokenResponse } from './token.response';

@ObjectType()
export class AuthResponse {
  @Field({ description: 'Logged in Account ID' })
  accountId!: string;

  @Field({ description: 'Access token' })
  accessToken!: TokenResponse;
}
