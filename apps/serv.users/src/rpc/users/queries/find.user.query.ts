import { FindUserRequest, User } from '@app/rpc/protobuf/users';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SStruct, isEmpty } from '@valhalla/utilities';
import mongoose, { FilterQuery, Query } from 'mongoose';

import { RpcHandler } from '@valhalla/serv.core';
import { UserSchema } from '@app/entities/users/schema';
import { UserTransformer } from '@app/entities/users/transformer';
import { UsersModel } from '@app/entities/users';

export class FindUserQuery implements IQuery {
  constructor(public readonly request: FindUserRequest) {}
}

@QueryHandler(FindUserQuery)
@RpcHandler()
export class FindUserHandler implements IQueryHandler<FindUserQuery, User> {
  constructor(private readonly users: UsersModel) {}

  private validateRequest(request: FindUserRequest) {
    const query: SStruct.Describe<FindUserRequest> = SStruct.object({
      userId: SStruct.optional(SStruct.string()),
      phone: SStruct.optional(SStruct.string()),
      email: SStruct.optional(SStruct.string()),
    });

    return SStruct.create(request, query);
  }

  private buildFilter(request: FindUserRequest): FilterQuery<UserSchema> {
    if (isEmpty(request)) {
      throw new Error('Must specify at least 1 parameter');
    }

    const filter: FilterQuery<UserSchema> = new Query();

    if (request.userId) {
      filter._id = new mongoose.Types.ObjectId(request.userId);
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

  async execute(command: FindUserQuery): Promise<User> {
    const payload = this.validateRequest(command.request);
    const filter = this.buildFilter(payload);
    const user = await this.users
      .findOne(filter)
      .orFail(() => new Error('No user found'));

    const userProto = new UserTransformer(user).proto;
    return userProto;
  }
}
