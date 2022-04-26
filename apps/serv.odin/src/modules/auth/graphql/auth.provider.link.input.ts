import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';

import { AuthProvider } from '@serv.odin/data.models/user.auth.providers/schema';

@InputType()
export class AuthProviderLinkInput {
  @Field(() => AuthProvider, { description: 'Authentication provider' })
  @IsEnum(AuthProvider)
  provider: AuthProvider;

  @Field({ description: 'Provider token' })
  @IsString()
  token: string;
}
