import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { Environment } from '@odin/config/environment';
import { FacebookService } from './services/facebook.service';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { GithubStrategy } from './strategies/github.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { TwitterStrategy } from './strategies/twitter.strategy';
import { UserSchema } from '@odin/data.models/users/schema';
import { UserService } from './services/user.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: Environment.variables.JWT_SECRET,
      signOptions: {
        expiresIn: Environment.variables.JWT_EXPIRES,
      },
    }),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // FacebookService,
    // FacebookStrategy,
    // GithubStrategy,
    // GoogleStrategy,
    JwtStrategy,
    LocalStrategy,
    // TwitterStrategy,
    UserService,
  ],
  exports: [AuthService, UserService],
})
export class AuthModule {}
