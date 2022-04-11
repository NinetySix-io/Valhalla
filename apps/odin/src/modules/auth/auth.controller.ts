// TODO: Type Request

import {
  Controller,
  Get,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import express from 'express';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@ApiTags('Authorization API')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor() {}

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
}
