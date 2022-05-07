import { CacheStore, CACHE_MANAGER, Inject } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HasRightsRequest, HasRightsResponse } from '@serv.iam/protobuf/access';
import { RpcHandler } from '@valhalla/serv.core/src';
import { isNil } from '@valhalla/utilities';
import { NestCasbinService } from 'nestjs-casbin';

export class HasRightsQuery implements IQuery {
  constructor(public readonly input: HasRightsRequest) {}
}

@QueryHandler(HasRightsQuery)
@RpcHandler()
export class HasRightsHandler
  implements IQueryHandler<HasRightsQuery, HasRightsResponse>
{
  constructor(
    private readonly accessEnforcer: NestCasbinService,
    @Inject(CACHE_MANAGER) private readonly cacheStore: CacheStore,
  ) {}

  async execute(query: HasRightsQuery): Promise<HasRightsResponse> {
    const cacheKey =
      'service-access/has-rights/' +
      query.input.token +
      '/' +
      query.input.scope +
      '/' +
      query.input.tenantId;

    const cache = await this.cacheStore.get<boolean>(cacheKey);
    if (!isNil(cache)) {
      return {
        hasAccess: cache,
      };
    }

    await this.accessEnforcer.enforcer.loadPolicy();

    //TODO: type this?
    const objs = query.input.scope.split('_');
    const policy = `${query.input.tenantId}::${query.input.token}`;
    const hasAccess = await this.accessEnforcer.hasPolicy(
      policy,
      objs[1],
      objs[0],
    );

    await this.cacheStore.set(cacheKey, hasAccess, { ttl: 5000 });
    return {
      hasAccess,
    };
  }
}
