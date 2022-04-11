import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  @Field({ description: 'Session Token' })
  readonly token: string;
}
