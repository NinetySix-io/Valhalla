import { ArgsType, Field } from '@nestjs/graphql';

import { ObjectIDResolver } from 'graphql-scalars';

@ArgsType()
export class RemovePhoneArgs {
  @Field(() => ObjectIDResolver)
  phoneId: string;
}
