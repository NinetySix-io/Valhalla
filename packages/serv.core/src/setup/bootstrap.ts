import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { NestCloud } from '@nestcloud2/core';
import { NestFactory } from '@nestjs/core';
import { ServCoreSetup } from './setup';
import { ValidationPipe } from '@nestjs/common';
import fastifyCookie from '@fastify/cookie';
import { loadDotEnv } from '../lib';

/**
 * It creates a NestJS application, sets up the ServCore module, and returns the application
 * @param AppModule - The NestJS application module
 * @param options - {
 * @returns The app is being returned.
 */
export async function bootstrapApplication(
  AppModule: { new (): unknown },
  options?: {
    grpc?: ServCoreSetup['grpc'];
    preSetup?: (app: NestFastifyApplication) => void | Promise<void>;
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

  await app.register(fastifyCookie);
  await options?.preSetup?.(app);
  await servCore.setup();
  return app;
}
