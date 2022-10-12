import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenResponse {
  @Field({ description: 'Token' })
  value!: string;

  @Field({ description: 'Token expiry' })
  expiresAt!: Date;
}
