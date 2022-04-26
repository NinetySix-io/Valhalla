import { Field, InputType } from '@nestjs/graphql';

import { AuthProvider } from '@serv.odin/data.models/user.auth.providers/schema';
import { IsEnum } from 'class-validator';

@InputType()
export class AuthProviderUnlinkLinkInput {
  @Field(() => AuthProvider, {
    description: 'Authentication provider',
  })
  @IsEnum(AuthProvider)
  provider: AuthProvider;
}
