// TODO: Type Request

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import express from 'express';
import { TokenDto } from './dto/token.dto';
import { UserSignupDto } from './dto/user.signup';
import { UsernameDto } from './dto/username.dto';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@ApiTags('Authorization API')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  @ApiOperation({ summary: 'Initiates the Facebook OAuth2 login flow' })
  facebookLogin() {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  @ApiOperation({
    summary:
      'Handles the Facebook OAuth2 callback and return User Info when Successful',
  })
  facebookLoginCallback(@Req() req, @Res() res: express.Response) {
    const jwt: string = req.user.jwt;
    if (!jwt) {
      throw new UnauthorizedException();
    }

    return res.status(200).end();
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  @ApiOperation({ summary: 'Initiates the GitHub OAuth2 login flow' })
  githubLogin() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  @ApiOperation({
    summary:
      'Handles the GitHub OAuth2 callback and return User Info when Successful',
  })
  githubLoginCallback(@Req() req, @Res() res: express.Response) {
    const jwt: string = req.user.jwt;
    if (!jwt) {
      throw new UnauthorizedException();
    }

    return res.status(200).end();
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Initiates the Google OAuth2 login flow' })
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    summary:
      'Handles the Google OAuth2 callback and return User Info when Successful',
  })
  googleLoginCallback(@Req() req, @Res() res: express.Response) {
    const jwt: string = req.user.jwt;
    if (!jwt) {
      throw new UnauthorizedException();
    }

    return res.status(200).end();
  }

  @Get('twitter')
  @UseGuards(AuthGuard('twitter'))
  @ApiOperation({ summary: 'Initiates the Twitter OAuth2 login flow' })
  twitterLogin() {}

  @Get('twitter/callback')
  @UseGuards(AuthGuard('twitter'))
  @ApiOperation({
    summary:
      'Handles the Twitter Windows Live OAuth2 callback and return User Info when Successful',
  })
  twitterLoginCallback(@Req() req, @Res() res: express.Response) {
    const jwt: string = req.user.jwt;
    if (!jwt) {
      throw new UnauthorizedException();
    }

    return res.status(200).end();
  }

  @Get('linkedin')
  @UseGuards(AuthGuard('linkedin'))
  @ApiOperation({ summary: 'Initiates the LinkedIn OAuth2 login flow' })
  linkedinLogin() {}

  @Get('linkedin/callback')
  @UseGuards(AuthGuard('linkedin'))
  @ApiOperation({
    summary:
      'Handles the LinkedIn OAuth2 callback and return User Info when Successful',
  })
  linkedinLoginCallback(@Req() req, @Res() res: express.Response) {
    const jwt: string = req.user.jwt;
    if (!jwt) {
      throw new UnauthorizedException();
    }

    return res.status(200).end();
  }

  @ApiOperation({ summary: 'Login Current User' })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Logout Current User' })
  @Get('/logout')
  logout(@Req() req, @Res() res: express.Response) {
    req.logout();
    res.redirect('/');
  }

  @ApiOperation({ summary: 'Signup a new User' })
  @Post('signup')
  async signup(@Body() signupUser: UserSignupDto) {
    return await this.authService.signup(signupUser);
  }

  @ApiOperation({ summary: 'Check if Username is Available in the DB' })
  @Post('username-available')
  async usernameAvailable(@Body() username: UsernameDto) {
    return await this.authService.usernameAvailable(username);
  }

  @ApiOperation({ summary: 'Link a new OAuth Provider to a User' })
  @Post('link/:providerName')
  @UseGuards(AuthGuard('jwt'))
  providerLink(@Param() params, @Body() tokenDto: TokenDto, @Request() req) {
    console.log(
      'link::',
      req.user,
      'providerName::',
      params.providerName,
      ' - token::',
      tokenDto,
    );
    return this.userService.link(
      req.user.userId,
      tokenDto.token,
      params.providerName,
    );
  }

  @ApiOperation({ summary: 'Unlink an OAuth Provider from a User' })
  @Get('unlink/:providerName')
  @UseGuards(AuthGuard('jwt'))
  unlink(@Param() params, @Request() req) {
    console.log('user is', req.user);
    return this.userService.unlink(req.user.userId, params.providerName);
  }

  @ApiOperation({ summary: "Get User's Information" })
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return this.userService.findOne({
      'providers.providerId': req.user.userId,
    });
  }
}
