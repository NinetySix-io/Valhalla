import { InjectConfig } from '@nestcloud2/config';
import { ConsulConfig } from '@nestcloud2/config/config.consul';
import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from '@nestjs/common';
import { RedisClientOptions } from '@redis/client';
import redisStore from 'cache-manager-redis-store';

@Injectable()
export class CacheStoreConfigService implements CacheOptionsFactory {
  constructor(@InjectConfig() private readonly config: ConsulConfig) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    const database = this.config.get<RedisClientOptions>('database.redis');
    type Cache = { ttl: number; max: number };
    const cache = this.config.get<Cache>('app.caching');

    if (database?.password === '') {
      delete database.password;
    }

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      store: redisStore as any,
      ttl: cache?.ttl, // seconds
      max: cache?.max, // maximum number of items in cache
      options: {
        ...database,
      },
    };
  }
}
