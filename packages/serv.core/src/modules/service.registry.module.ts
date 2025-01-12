import { BOOT, CONSUL } from '@nestcloud2/common';
import { CacheModule, Global, Module } from '@nestjs/common';

import { CacheStoreConfigService } from '../services/cache.store.service';
import { ConfigModule } from '@nestcloud2/config';
import { ConsulModule } from '@nestcloud2/consul';
import { GrpcModule } from '@nestcloud2/grpc';
import { LoadbalanceModule } from '@nestcloud2/loadbalance';
import { ScheduleModule } from '@nestcloud2/schedule';
import { ServiceModule } from '@nestcloud2/service';

const modules = [
  ScheduleModule.forRoot(),
  GrpcModule.forRoot(),
  ConsulModule.forRootAsync({ inject: [BOOT] }),
  ConfigModule.forRootAsync({ inject: [BOOT, CONSUL] }),
  ServiceModule.forRootAsync({ inject: [BOOT, CONSUL] }),
  LoadbalanceModule.forRootAsync({ inject: [BOOT] }),
  CacheModule.registerAsync({ useClass: CacheStoreConfigService }),
];

@Global()
@Module({
  imports: modules,
  exports: modules,
})
export class ServiceRegistryModule {}
