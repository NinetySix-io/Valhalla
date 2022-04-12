import { JWT_PASSPORT, JwtStrategy } from './strategies/jwt.strategy';

import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './services/auth.service';
import { Environment } from '@odin/config/environment';
import { GraphqlPassportAuthGuard } from '@odin/guards/auth.guard';
// import { FacebookService } from './services/facebook.service';
// import { FacebookStrategy } from './strategies/facebook.strategy';
// import { GithubStrategy } from './strategies/github.strategy';
// import { GoogleStrategy } from './strategies/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PasswordSchema } from '@odin/data.models/user.passwords/schema';
import { PasswordService } from './services/password.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserAuthProviderSchema } from '@odin/data.models/user.auth.providers/schema';
import { UserAuthProviderService } from './services/user.auth.provider.service';
import { UserAuthProvidersModel } from '@odin/data.models/user.auth.providers';
import { UserPasswordsModel } from '@odin/data.models/user.passwords';
// import { TwitterStrategy } from './strategies/twitter.strategy';
import { UserSchema } from '@odin/data.models/users/schema';
import { UserService } from './services/user.service';
import { UsersModel } from '@odin/data.models/users';

@Module({
  imports: [
    TypegooseModule.forFeature([
      UserSchema,
      PasswordSchema,
      UserAuthProviderSchema,
    ]),
    JwtModule.register({
      secret: Environment.variables.JWT_SECRET,
      signOptions: {
        expiresIn: Environment.variables.JWT_EXPIRES,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthResolver,
    UsersModel,
    UserPasswordsModel,
    UserAuthProvidersModel,

    // FacebookService,
    // FacebookStrategy,
    // GithubStrategy,
    // GoogleStrategy,
    // TwitterStrategy,

    /**
     * This registers the jwt strategy
     */
    JwtStrategy,
    AuthService,
    UserService,
    PasswordService,
    UserAuthProviderService,
    GraphqlPassportAuthGuard,
  ],
  exports: [AuthService, UserService, PasswordService, UserAuthProviderService],
})
export class AuthModule {}
