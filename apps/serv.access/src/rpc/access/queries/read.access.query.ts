import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  ReadAccessRequest,
  ReadAccessResponse,
} from '@app/rpc/protobuf/access';

import { AccessProvisionService } from '@app/services/access.provision.service';

export class ReadAccessQuery implements IQuery {
  constructor(public readonly request: ReadAccessRequest) {}
}

@QueryHandler(ReadAccessQuery)
export class ReadAccessHandler
  implements IQueryHandler<ReadAccessQuery, ReadAccessResponse>
{
  constructor(private readonly accessService: AccessProvisionService) {}

  async execute(command: ReadAccessQuery): Promise<ReadAccessResponse> {
    const token = command.request.refreshToken;
    const data = await this.accessService.findRefreshToken(token);
    return { userId: data.user };
  }
}
