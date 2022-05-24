import { AccessRpcClientService } from '@valhalla/serv.clients';
import { BootConfigService } from '@app/services/boot.config.service';
import { FindUserHandler } from './queries/find.user.query';
import { ForgotAccountPasswordHandler } from '@app/rpc/users/commands/forgot.password.command';
import { JwtConfigService } from '@app/services/jwt.config.service';
import { JwtModule } from '@nestjs/jwt';
import { LoginAccountHandler } from '@app/rpc/users/commands/login.command';
import { Module } from '@nestjs/common';
import { RegisterAccountHandler } from '@app/rpc/users/commands/register.command';
import { RpcUsersController } from './users.controller';
import { SendAccountEmailVerificationHandler } from '@app/rpc/users/commands/send.email.verification.command';
import { TypegooseModule } from 'nestjs-typegoose';
import { UpdateAccountHandler } from '@app/rpc/users/commands/update.command';
import { UpdateAccountPasswordHandler } from '@app/rpc/users/commands/update.password.command';
import { UserPasswordSchema } from '@app/entities/user.passwords/schema';
import { UserPasswordsModel } from '@app/entities/user.passwords';
import { UserSchema } from '@app/entities/users/schema';
import { UsersModel } from '@app/entities/users';
import { VerifyAccountEmailHandler } from '@app/rpc/users/commands/verify.email.command';

@Module({
  imports: [
    TypegooseModule.forFeature([UserSchema, UserPasswordSchema]),
    JwtModule.registerAsync({ useClass: JwtConfigService }),
  ],
  providers: [
    AccessRpcClientService,
    BootConfigService,

    // DATABASE MODELS
    UsersModel,
    UserPasswordsModel,

    // HANDLERS
    FindUserHandler,
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
