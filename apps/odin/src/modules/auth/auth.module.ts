import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './services/auth.service';
import { Environment } from '@odin/environment';
// import { FacebookService } from './services/facebook.service';
// import { FacebookStrategy } from './strategies/facebook.strategy';
// import { GithubStrategy } from './strategies/github.strategy';
// import { GoogleStrategy } from './strategies/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './services/jwt.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TokenStrategy } from './strategies/token.strategy';
// import { PassportModule } from '@nestjs/passport';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserAuthProviderSchema } from '@odin/data.models/user.auth.providers/schema';
import { UserAuthProvidersModel } from '@odin/data.models/user.auth.providers';
import { UserPasswordSchema } from '@odin/data.models/user.passwords/schema';
import { UserPasswordsModel } from '@odin/data.models/user.passwords';
import { UserRefreshTokenSchema } from '@odin/data.models/user.refresh.tokens/schema';
import { UserRefreshTokensModel } from '@odin/data.models/user.refresh.tokens';
// import { TwitterStrategy } from './strategies/twitter.strategy';
import { UserSchema } from '@odin/data.models/users/schema';
import { UserService } from './services/user.service';
import { UsersModel } from '@odin/data.models/users';

@Module({
  imports: [
    PassportModule,
    TypegooseModule.forFeature([
      UserSchema,
      UserPasswordSchema,
      UserAuthProviderSchema,
      UserRefreshTokenSchema,
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
    UserRefreshTokensModel,

    // FacebookService,
    // FacebookStrategy,
    // GithubStrategy,
    // GoogleStrategy,
    // TwitterStrategy,

    /**
     * This registers the jwt strategy
     */
    TokenStrategy,
    JwtService,
    AuthService,
    UserService,
  ],
  exports: [AuthService, UserService],
})
export class AuthModule {}
