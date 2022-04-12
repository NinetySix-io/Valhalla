import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly displayName: string;

  @Field()
  readonly email: string;

  @Field({ nullable: true })
  readonly avatar?: string;
}
