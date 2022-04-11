import { ArgsType, Field, Int } from '@nestjs/graphql';

// import { StringQueryArgs } from '../../../shared/graphql/inputs';

@ArgsType()
export class UserQueryArgs {
  @Field((type) => Int)
  first: number;

  @Field((type) => Int)
  offset: number;

  @Field({ nullable: true })
  cursor: string;
}
