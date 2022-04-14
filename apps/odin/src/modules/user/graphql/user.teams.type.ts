import { Field, ID } from '@nestjs/graphql';

export class Team {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly name: string;

  @Field()
  readonly avatar?: string;
}
