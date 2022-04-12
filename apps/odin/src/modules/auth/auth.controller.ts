import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import express from 'express';
import { FACEBOOK_PASSPORT } from './strategies/facebook.strategy';
import { GITHUB_PASSPORT } from './strategies/github.strategy';
import { GOOGLE_PASSPORT } from './strategies/google.strategy';
import { TWITTER_PASSPORT } from './strategies/twitter.strategy';

@ApiTags('Authorization API')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor() {}

  @Get('facebook')
  @UseGuards(AuthGuard(FACEBOOK_PASSPORT))
  @ApiOperation({ summary: 'Initiates the Facebook OAuth2 login flow' })
  facebookLogin() {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard(FACEBOOK_PASSPORT))
  @ApiOperation({ summary: 'Handles the Facebook OAuth2 callback' })
  facebookLoginCallback(
    @Req() _req: express.Request,
    @Res() res: express.Response,
  ) {
    return res.status(200).end();
  }

  @Get('github')
  @UseGuards(AuthGuard(GITHUB_PASSPORT))
  @ApiOperation({ summary: 'Initiates the GitHub OAuth2 login flow' })
  githubLogin() {}

  @Get('github/callback')
  @UseGuards(AuthGuard(GITHUB_PASSPORT))
  @ApiOperation({ summary: 'Handles the GitHub OAuth2 callback' })
  githubLoginCallback(@Req() _req, @Res() res: express.Response) {
    return res.status(200).end();
  }

  @Get('google')
  @UseGuards(AuthGuard(GOOGLE_PASSPORT))
  @ApiOperation({ summary: 'Initiates the Google OAuth2 login flow' })
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard(GOOGLE_PASSPORT))
  @ApiOperation({ summary: 'Handles the Google OAuth2 callback' })
  googleLoginCallback(
    @Req() _req: express.Request,
    @Res() res: express.Response,
  ) {
    return res.status(200).end();
  }

  @Get('twitter')
  @UseGuards(AuthGuard(TWITTER_PASSPORT))
  @ApiOperation({ summary: 'Initiates the Twitter OAuth2 login flow' })
  twitterLogin() {}

  @Get('twitter/callback')
  @UseGuards(AuthGuard(TWITTER_PASSPORT))
  @ApiOperation({ summary: 'Handles the Twitter OAuth2 callback' })
  twitterLoginCallback(
    @Req() _req: express.Request,
    @Res() res: express.Response,
  ) {
    return res.status(200).end();
  }
}
