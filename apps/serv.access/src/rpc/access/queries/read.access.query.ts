import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  ReadAccessRequest,
  ReadAccessResponse,
} from '@app/rpc/protobuf/access';

import { AccessTokenTransformer } from '@app/entities/access.tokens/transformer';
import { AccessTokensModel } from '@app/entities/access.tokens';
import { RpcHandler } from '@valhalla/serv.core';
import { SStruct } from '@valhalla/utilities';

export class ReadAccessQuery implements IQuery {
  constructor(public readonly input: ReadAccessRequest) {}
}

@QueryHandler(ReadAccessQuery)
@RpcHandler()
export class ReadAccessHandler
  implements IQueryHandler<ReadAccessQuery, ReadAccessResponse>
{
  constructor(private accessTokens: AccessTokensModel) {}

  private validateRequest(request: ReadAccessRequest) {
    const schema: SStruct.Describe<ReadAccessRequest> = SStruct.object({
      id: SStruct.string(),
      tenantId: SStruct.string(),
    });

    return SStruct.create(request, schema);
  }

  async execute(query: ReadAccessQuery): Promise<ReadAccessResponse> {
    const payload = this.validateRequest(query.input);
    const token = await this.accessTokens
      .findOne({ _id: payload.id, tenantId: payload.tenantId })
      .orFail(() => new Error('Access token not found'));

    const accessToken = new AccessTokenTransformer(token).proto;

    return {
      accessToken,
    };
  }
}
