import { Injectable, Logger } from '@nestjs/common';
import { resolveRpcRequest, toObjectId } from '@valhalla/serv.core';

import { Account } from '@app/protobuf';
import { AccountsModel } from '@app/entities/accounts';
import { BootConfigService } from '@app/services/boot.config.service';
import { Environment } from '@app/env';
import { JwtContent } from './types';
import { JwtService } from '@nestjs/jwt';
import { OrgsRpcClientService } from '@valhalla/serv.clients';
import { RefreshTokensModel } from '@app/entities/refresh.tokens';
import { ServOrgs } from '@valhalla/serv.clients';
import dayjs from 'dayjs';
import { isNil } from '@valhalla/utilities';
import ms from 'ms';

@Injectable()
export class AccessProvisionService {
  private readonly logger = new Logger(AccessProvisionService.name);

  constructor(
    private readonly bootConfig: BootConfigService,
    private readonly jwtService: JwtService,
    private readonly refreshTokens: RefreshTokensModel,
    private readonly accounts: AccountsModel,
    private readonly orgService: OrgsRpcClientService,
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
    const tokenId = toObjectId(refreshToken);
    const content = await this.refreshTokens.findOneAndDelete({ _id: tokenId });
    return content;
  }

  /**
   * It creates a new refresh token, deletes all other refresh tokens for the account, and then creates
   * a new access token
   * @param {Account} account - Account - This is the account object that was passed in from the login
   * method.
   * @returns An object with the refreshToken, accessToken
   */
  async createRefreshToken(account: Account) {
    const accountId = toObjectId(account.id);

    if (!Environment.isDev) {
      await this.refreshTokens.deleteMany({
        account: accountId,
      });
    }

    const token = await this.refreshTokens.create({
      account: accountId,
      expiresAt: this.bootConfig.refreshTokenExpiry,
    });

    const refreshToken = token.id;
    const accessToken = await this.createAccessToken(account);

    this.logger.warn(
      `Refresh Token[${refreshToken}] generated an access token`,
    );

    return {
      refreshToken,
      accessToken: accessToken.value,
      accessTokenExpiresAt: accessToken.expiresAt,
    };
  }

  /**
   * It takes a refresh token, finds the account associated with it, and generates a new access token
   * @param {string} refreshToken - The refresh token that was sent to the client.
   * @returns An object with the access token and the access token expiry date.
   */
  async renewAccessToken(
    refreshToken: string,
    options?: Parameters<typeof this['createAccessToken']>[1],
  ) {
    const token = await this.refreshTokens
      .findById(refreshToken)
      .orFail(() => new Error('Refresh token does not exists!'));

    const account = await this.accounts
      .findById(token.account)
      .orFail(() => new Error('Account does not exists!'));

    const accessToken = await this.createAccessToken(account, options);
    this.logger.warn(
      `Refresh Token[${refreshToken}] generated an access token`,
    );

    return accessToken;
  }

  /**
   * It decodes the access token and returns the decoded data
   * @param {string} accessToken - The access token to decode.
   * @returns The JwtContent interface is being returned.
   */
  decodeAccessToken(accessToken: string): JwtContent {
    const data = this.jwtService.decode(accessToken) as JwtContent;
    if (isNil(data) || typeof data === 'string') {
      throw new Error('Invalid token!');
    }

    return data;
  }

  /**
   * It creates a JWT access token for the given account
   * @param account - Pick<Account, 'id' | 'displayName'>
   * @returns A string
   */
  async createAccessToken(
    account: JwtContent['account'],
    options?: {
      organization?: ServOrgs.Organization['id'];
    },
  ) {
    const expiresIn = this.bootConfig.accessTokenExpiry;
    const content: JwtContent = {
      account: {
        id: account.id,
        displayName: account.displayName,
      },
    };

    if (options?.organization) {
      const organization = await resolveRpcRequest(
        this.orgService.svc.getMember({
          userId: account.id,
          orgId: options.organization,
        }),
      );

      if (organization.member) {
        content.organization = {
          id: organization.member.organization,
          role: organization.member.role,
        };
      }
    }

    const milliseconds = ms(expiresIn);
    const expiresAt = dayjs().add(milliseconds, 'milliseconds').toDate();
    const accessToken = this.jwtService.sign(content, { expiresIn });

    return {
      value: accessToken,
      expiresAt,
    };
  }
}
