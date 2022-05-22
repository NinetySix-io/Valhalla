import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { NestCloud } from '@nestcloud2/core';
import { NestFactory } from '@nestjs/core';
import { ServCoreSetup } from './setup';
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
    hostName?: ServCoreSetup['hostname'];
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

  process.on('SIGINT', async () => {
    setTimeout(() => process.exit(1), 5000);
    await app.close();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    setTimeout(() => process.exit(1), 5000);
    await app.close();
    process.exit(0);
  });

  await options?.preSetup?.(app);
  await servCore.setup();
  return app;
}
