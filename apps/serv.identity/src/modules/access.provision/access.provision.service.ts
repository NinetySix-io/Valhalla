import { Injectable, Logger } from '@nestjs/common';

import { Account } from '@app/protobuf';
import { AccountTransformer } from '@app/entities/accounts/transformer';
import { AccountsModel } from '@app/entities/accounts';
import { BootConfigService } from '@app/services/boot.config.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokensModel } from '@app/entities/refresh.tokens';
import { isNil } from '@valhalla/utilities';
import mongoose from 'mongoose';

@Injectable()
export class AccessProvisionService {
  private readonly logger = new Logger(AccessProvisionService.name);

  constructor(
    private readonly bootConfig: BootConfigService,
    private readonly jwtService: JwtService,
    private readonly refreshTokens: RefreshTokensModel,
    private readonly accounts: AccountsModel,
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
   * It creates a new refresh token, deletes all other refresh tokens for the account, and then creates
   * a new access token
   * @param {Account} account - Account - This is the account object that was passed in from the login
   * method.
   * @returns An object with the refreshToken, accessToken, and accessTokenExpiresAt
   */
  async createAccessToken(account: Account) {
    const accountId = new mongoose.Types.ObjectId(account.id);
    await this.refreshTokens.deleteMany({ account: accountId });
    const token = await this.refreshTokens.create({
      account: accountId,
      expiresAt: this.bootConfig.refreshTokenExpiry,
    });

    const refreshToken = token.id;
    const expiresAt = this.bootConfig.accessTokenExpiry.toISOString();
    const accessToken = this.jwtService.sign({
      account,
      expiresAt,
    });

    this.logger.warn(
      `Refresh Token[${refreshToken}] generated an access token`,
    );

    return {
      refreshToken,
      accessToken,
      accessTokenExpiresAt: expiresAt,
    };
  }

  /**
   * It takes a refresh token, finds the account associated with it, and generates a new access token
   * @param {string} refreshToken - The refresh token that was sent to the client.
   * @returns An object with the access token and the access token expiry date.
   */
  async renewAccessToken(refreshToken: string) {
    const token = await this.refreshTokens
      .findById(refreshToken)
      .orFail(() => new Error('Refresh token does not exists!'));

    const account = await this.accounts
      .findById(token.account)
      .orFail(() => new Error('Account does not exists!'));

    const expiresAt = this.bootConfig.accessTokenExpiry.toISOString();
    const accessToken = this.jwtService.sign({
      account: new AccountTransformer(account).proto,
      expiresAt,
    });

    this.logger.warn(
      `Refresh Token[${refreshToken}] generated an access token`,
    );

    return {
      accessToken,
      accessTokenExpiresAt: expiresAt,
    };
  }

  /**
   * It decodes the access token and returns the account and the expiration date
   * @param {string} accessToken - The access token to decode.
   * @returns An object with two properties: account and expiresAt.
   */
  decodeAccessToken(accessToken: string): {
    account: Account;
    expiresAt: string;
  } {
    const data = this.jwtService.decode(accessToken);
    if (isNil(data) || typeof data === 'string') {
      throw new Error('Invalid token!');
    }

    return {
      account: data.account,
      expiresAt: data.expiresAt,
    };
  }
}
