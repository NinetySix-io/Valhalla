import { Injectable, Logger } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { RefreshTokenSchema } from '@app/entities/refresh.tokens/schema';
import { RefreshTokensModel } from '@app/entities/refresh.tokens';
import mongoose from 'mongoose';

type TokenContent = {
  userId: RefreshTokenSchema['user'];
};

@Injectable()
export class AccessProvisionService {
  private readonly logger = new Logger(AccessProvisionService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly refreshTokens: RefreshTokensModel,
  ) {}

  /**
   * Find a refresh token by its value
   * @param {string} refreshToken - The refresh token that was sent to the client.
   * @returns The refresh token
   */
  async findRefreshToken(refreshToken: string) {
    const data = await this.refreshTokens.findById(refreshToken);
    return data;
  }

  /**
   * It deletes the refresh token from the database
   * @param {string} refreshToken - The refresh token to revoke.
   * @returns The content of the refresh token.
   */
  async revokeRefreshToken(refreshToken: string) {
    const tokenId = new mongoose.Types.ObjectId(refreshToken);
    const content = await this.refreshTokens.findOneAndDelete({ _id: tokenId });
    return content;
  }

  /**
   * It creates a new token in the database, and then signs it with the JWT service
   * @param {TokenContent} content - TokenContent - This is the content of the token. It's a simple
   * object that contains the user's id and the user's role.
   * @returns A string
   */
  async createAccessToken(content: TokenContent): Promise<{
    refreshToken: string;
    accessToken: string;
  }> {
    const token = await this.refreshTokens.create({ user: content.userId });
    const refreshToken = token.id;
    const accessToken = this.jwtService.sign(content);

    this.logger.warn(
      `Access Token[${accessToken}] created from Refresh Token[${refreshToken}]`,
    );

    return {
      refreshToken,
      accessToken,
    };
  }

  /**
   * It finds a refresh token by its id, and if it exists, it returns a new access token
   * @param {string} refreshToken - The refresh token that was sent to the client.
   * @returns The access token is being returned.
   */
  async renewAccessToken(refreshToken: string): Promise<string> {
    const token = await this.refreshTokens
      .findById(refreshToken)
      .orFail(() => new Error('Refresh token does not exists!'));

    const accessToken = this.jwtService.sign(token.toObject());
    this.logger.warn(
      `Access Token[${accessToken}] created from Refresh Token[${refreshToken}]`,
    );
    return accessToken;
  }

  /**
   * It decodes the access token and returns the decoded token content
   * @param {string} accessToken - The access token to decode.
   * @returns The decoded access token.
   */
  decodeAccessToken(accessToken: string): TokenContent {
    return this.jwtService.decode(accessToken) as TokenContent;
  }
}
