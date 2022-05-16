import * as yup from 'yup';

import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  ReadAccessRequest,
  ReadAccessResponse,
} from '@serv.iam/protobuf/access';

import { AccessTokenTransformer } from '@serv.iam/entities/access.tokens/transformer';
import { AccessTokensModel } from '@serv.iam/entities/access.tokens';
import { RpcHandler } from '@valhalla/serv.core';

export class ReadAccessQuery implements IQuery {
  constructor(public readonly input: ReadAccessRequest) {}
}

@QueryHandler(ReadAccessQuery)
@RpcHandler()
export class ReadAccessHandler
  implements IQueryHandler<ReadAccessQuery, ReadAccessResponse>
{
  constructor(private accessTokens: AccessTokensModel) {}

  async execute(query: ReadAccessQuery): Promise<ReadAccessResponse> {
    const payload = await yup
      .object()
      .shape({
        id: yup.string().required(),
        tenantId: yup.string().required(),
      })
      .validateSync(query.input);

    const token = await this.accessTokens.findOne({
      _id: payload.id,
      tenantId: payload.tenantId,
    });

    if (!token) {
      throw new Error('Access token not found');
    }

    const accessToken = new AccessTokenTransformer(token).proto;
    return {
      accessToken,
    };
  }
}
