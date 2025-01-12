import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { NestCloud } from '@nestcloud2/core';
import { NestFactory } from '@nestjs/core';
import { ServCoreSetup } from './setup';
import { ValidationPipe } from '@nestjs/common';
import fastifyCookie from '@fastify/cookie';
import { loadDotEnv } from '../lib';

/**
 * It creates a NestJS application, sets up the ServCore module, and returns the application
 */
export async function bootstrapApplication(
  AppModule: { new (): unknown },
  options?: {
    grpc?: ServCoreSetup['grpc'];
    preSetup?: (app: NestFastifyApplication) => void | Promise<void>;
    context?: NestApplicationContextOptions;
  },
) {
  loadDotEnv();

  const adapter = new FastifyAdapter();
  const factory = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );

  const app = NestCloud.create(factory);
  const servCore = new ServCoreSetup(app, options);

  servCore.handleProcessTerminate();
  app.useGlobalPipes(new ValidationPipe());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await app.register(fastifyCookie as any);
  await options?.preSetup?.(app);
  await servCore.setup();
  return app;
}
