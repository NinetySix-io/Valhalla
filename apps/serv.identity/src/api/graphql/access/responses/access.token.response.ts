import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessTokenResponse {
  @Field({ description: 'Access token' })
  token!: string;

  @Field({ description: 'Token expiry' })
  expiresAt!: Date;
}
