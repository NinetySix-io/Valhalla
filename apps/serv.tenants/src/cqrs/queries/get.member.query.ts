import {
  GetMemberRequest,
  GetMemberResponse,
} from '@serv.tenants/protobuf/tenants';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { LoggerService } from '@nestjs/common';

export class GetMemberQuery implements IQuery {
  constructor(public readonly request: GetMemberRequest) {}
}

@QueryHandler(GetMemberQuery)
export class GetMemberHandler
  implements IQueryHandler<GetMemberQuery, GetMemberResponse>
{
  constructor(private readonly logger: LoggerService) {}

  async execute(command: GetMemberQuery): Promise<GetMemberResponse> {
    this.logger.debug(command);
    throw new Error('Not implemented');
  }
}
