import { ArgsType, Field } from '@nestjs/graphql';

import { ObjectIDResolver } from 'graphql-scalars';

@ArgsType()
export class RemoveEmailArgs {
  @Field(() => ObjectIDResolver)
  emailId: string;
}
