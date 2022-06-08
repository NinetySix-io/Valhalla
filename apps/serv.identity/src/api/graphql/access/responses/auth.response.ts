import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  @Field({ description: 'Logged in Account ID' })
  accountId!: string;

  @Field({ description: 'Access token' })
  accessToken!: string;

  @Field({ description: 'Access token expiry' })
  accessTokenExpiresAt!: Date;
}
