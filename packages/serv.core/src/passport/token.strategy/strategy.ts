import * as CustomPassport from 'passport-custom';

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AbstractStrategy, PassportStrategy } from '@nestjs/passport';
import { IdentityRpcClientService, ServIdentity } from '@valhalla/serv.clients';

import { Logger } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { tryNice } from 'try-nice';
import { resolveRpcRequest } from '../../lib/resolve.rpc.request';
import { AuthManager } from './auth.manager';

const TokenStrategyKey = 'token-strategy' as const;

@Injectable()
export class TokensStrategy
  extends PassportStrategy(CustomPassport.Strategy, TokenStrategyKey)
  implements AbstractStrategy
{
  private readonly logger = new Logger(TokensStrategy.name);
  static key = TokenStrategyKey;

  constructor(
    @Inject(IdentityRpcClientService)
    private readonly identityClient: IdentityRpcClientService,
  ) {
    super();
  }

  async validate(request: FastifyRequest): Promise<{
    account: Pick<ServIdentity.Account, 'id' | 'displayName'>;
  }> {
    const accessToken = AuthManager.getAccessTokenFromRequest(request);

    if (!accessToken) {
      throw new UnauthorizedException('Access token not provided!');
    } else if (typeof accessToken !== 'string') {
      throw new UnauthorizedException('Access token is not a string!');
    }

    if (!this.identityClient.svc) {
      throw new Error('Identity service is not online!');
    }

    const [result, error] = await tryNice(() =>
      resolveRpcRequest(
        this.identityClient.svc.decodeAccessToken({
          accessToken,
        }),
      ),
    );

    if (error) {
      this.logger.error((error as Error).message);
      throw new UnauthorizedException('Token is not valid or expired!');
    } else if (!result || !result.account) {
      this.logger.error('Unable to decode token', result);
      throw new UnauthorizedException('Token is not valid or expired!');
    }

    return {
      account: result.account,
    };
  }
}
