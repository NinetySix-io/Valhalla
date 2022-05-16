import {
  FindAccessRequest,
  FindAccessResponse,
} from '@serv.iam/protobuf/access';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AccessTokenTransformer } from '@serv.iam/entities/access.tokens/transformer';
import { AccessTokensModel } from '@serv.iam/entities/access.tokens';
import { RpcException } from '@nestjs/microservices';
import { RpcHandler } from '@valhalla/serv.core/src';

export class FindAccessQuery implements IQuery {
  constructor(public readonly input: FindAccessRequest) {}
}

@QueryHandler(FindAccessQuery)
@RpcHandler()
export class FindAccessHandler
  implements IQueryHandler<FindAccessQuery, FindAccessResponse>
{
  constructor(private readonly accessTokens: AccessTokensModel) {}

  async execute(query: FindAccessQuery): Promise<FindAccessResponse> {
    if (!query.input.tenantId) {
      throw new RpcException('Tenant ID required');
    }

    const filter = JSON.parse(query.input.filter);
    const tokens = await this.accessTokens.find(filter).lean();
    const accessTokens = tokens.map(
      (token) => new AccessTokenTransformer(token).proto,
    );

    return {
      accessTokens,
    };
  }
}