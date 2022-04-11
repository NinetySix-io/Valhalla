import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from '@odin/app.module';
import { Environment } from '@odin/config/environment';
import { LoggingInterceptor } from '@odin/interceptors/logging';
import { NestFactory } from '@nestjs/core';
import { TimeoutInterceptor } from '@odin/interceptors/timeout';
import { bodyParser } from '@odin/middlewares/body.parser';
import compression from 'compression';
import { httpsSecurity } from '@odin/middlewares/helmet';
import { rateLimit } from '@odin/middlewares/rate.limit';
import { setupSwagger } from './swagger';
import { voyager } from '@odin/middlewares/voyager';

declare const module: any;

const logger = new Logger();

async function bootstrap() {
  Environment.initialize();
  const PORT = Environment.variables.PORT || 5000;
  const app = await NestFactory.create(AppModule, { logger });
  setupSwagger(app, PORT);

  app.enableCors();
  // MIDDLEWARES
  app.getHttpAdapter();
  app.use(compression());
  app.use(httpsSecurity());
  app.use(bodyParser());
  app.use(rateLimit());
  app.use('/voyager', voyager());

  // INTERCEPTORS
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TimeoutInterceptor());

  // NOTE: global nest setup
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      forbidUnknownValues: true,
    }),
  );

  app.enableShutdownHooks();

  await app.listen(PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  return app;
}

bootstrap()
  .then(async (app) => {
    const url = await app.getUrl();
    logger.log(`Server running on ${url}`);
  })
  .catch((error) => {
    logger.error('Error starting server', error);
    process.exit;
  });
