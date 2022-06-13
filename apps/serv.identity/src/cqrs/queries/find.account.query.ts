import { Account, FindAccountRequest } from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';
import { SStruct, isEmpty } from '@valhalla/utilities';

import { AccountSchema } from '@app/entities/accounts/schema';
import { AccountTransformer } from '@app/entities/accounts/transformer';
import { AccountsModel } from '@app/entities/accounts';
import { FilterQuery } from 'mongoose';

export class FindAccountQuery implements IQuery {
  constructor(public readonly request: FindAccountRequest) {}
}

@QueryHandler(FindAccountQuery)
@RpcHandler()
export class FindAccountHandler
  implements IQueryHandler<FindAccountQuery, Account>
{
  constructor(private readonly accounts: AccountsModel) {}

  private validateRequest(request: FindAccountRequest) {
    const query: SStruct.Describe<FindAccountRequest> = SStruct.object({
      accountId: SStruct.optional(SStruct.string()),
      phone: SStruct.optional(SStruct.string()),
      email: SStruct.optional(SStruct.string()),
    });

    return SStruct.create(request, query);
  }

  private buildFilter(request: FindAccountRequest): FilterQuery<AccountSchema> {
    if (isEmpty(request)) {
      throw new Error('Must specify at least 1 parameter');
    }

    const filter: FilterQuery<AccountSchema> = {};

    if (request.accountId) {
      filter._id = toObjectId(request.accountId);
      return filter;
    }

    if (request.email) {
      filter['emails.value'] = request.email.trim();
    }

    if (request.phone) {
      filter['phones.value'] = request.phone.trim();
    }

    return filter;
  }

  async execute(command: FindAccountQuery): Promise<Account> {
    const payload = this.validateRequest(command.request);
    const filter = this.buildFilter(payload);
    const user = await this.accounts
      .findOne(filter)
      .orFail(() => new Error('No user found'));

    const userProto = new AccountTransformer(user).proto;
    return userProto;
  }
}
