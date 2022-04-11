import { Field, InputType } from '@nestjs/graphql';

import { AuthProvider } from '@odin/data.models/user.auth.providers/schema';
import { IsEnum } from 'class-validator';

@InputType()
export class AuthProviderUnlinkLinkInput {
  @Field((type) => AuthProvider, {
    description: 'Authentication provider',
  })
  @IsEnum(AuthProvider)
  provider: AuthProvider;
}
