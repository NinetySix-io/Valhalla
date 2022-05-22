import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserRegisterResponse {
  @Field({ description: 'Activation Link' })
  activationLink!: string;

  @Field({ description: 'User ID' })
  userId!: string;
}
