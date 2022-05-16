import { BootConfigService } from '@serv.users/services/boot.config.service';
import { ForgotAccountPasswordHandler } from '@serv.users/rpc/users/commands/forgot.password.command';
import { JwtConfigService } from '@valhalla/serv.core';
import { JwtModule } from '@nestjs/jwt';
import { LoginAccountHandler } from '@serv.users/rpc/users/commands/login.command';
import { Module } from '@nestjs/common';
import { RegisterAccountHandler } from '@serv.users/rpc/users/commands/register.command';
import { RpcUsersController } from './users.controller';
import { SendAccountEmailVerificationHandler } from '@serv.users/rpc/users/commands/send.email.verification.command';
import { TypegooseModule } from 'nestjs-typegoose';
import { UpdateAccountHandler } from '@serv.users/rpc/users/commands/update.command';
import { UpdateAccountPasswordHandler } from '@serv.users/rpc/users/commands/update.password.command';
import { UserPasswordSchema } from '@serv.users/entities/user.passwords/schema';
import { UserPasswordsModel } from '@serv.users/entities/user.passwords';
import { UserSchema } from '@serv.users/entities/users/schema';
import { UsersModel } from '@serv.users/entities/users';
import { VerifyAccountEmailHandler } from '@serv.users/rpc/users/commands/verify.email.command';

@Module({
  imports: [
    JwtModule.registerAsync({ useClass: JwtConfigService }),
    TypegooseModule.forFeature([UserSchema, UserPasswordSchema]),
  ],
  providers: [
    BootConfigService,

    // DATABASE MODELS
    UsersModel,
    UserPasswordsModel,

    // HANDLERS
    ForgotAccountPasswordHandler,
    LoginAccountHandler,
    RegisterAccountHandler,
    SendAccountEmailVerificationHandler,
    UpdateAccountHandler,
    UpdateAccountPasswordHandler,
    VerifyAccountEmailHandler,
  ],
  controllers: [RpcUsersController],
})
export class RpcUsersModule {}
