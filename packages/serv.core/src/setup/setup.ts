import { GrpcOptions, Transport } from '@nestjs/microservices';
import { INestApplication, Logger } from '@nestjs/common';

import { BOOT } from '@nestcloud2/common';
import { Boot } from '@nestcloud2/boot';
import { ServAppConfigService } from '../services';
import { isEmpty } from 'class-validator';
import { isNil } from '@valhalla/utilities';

export class ServCoreSetup {
  app: INestApplication;
  logger = Logger;
  microServices: Partial<{ [key in 'grpc']: true }> = {};
  grpc?: GrpcOptions['options'];
  config: ServAppConfigService;

  constructor(
    app: INestApplication,
    options?: { grpc?: ServCoreSetup['grpc'] },
  ) {
    this.app = app;
    this.grpc = options?.grpc;
    this.config = new ServAppConfigService(this.app.get<Boot>(BOOT));
  }

  /**
   * It connects the gRPC server to the NestJS application
   */
  private connectRpcServer(): void {
    if (isNil(this.grpc)) {
      return;
    }

    this.microServices.grpc = true;
    const options: GrpcOptions['options'] = {
      url: this.config.gRpcUrl,
      ...this.grpc,
    };

    /**
     * If {option.url} is not provided, its default to 5000
     */
    this.app.connectMicroservice<GrpcOptions>({
      transport: Transport.GRPC,
      options,
    });
  }

  /**
   * The function `setup()` is an asynchronous function that connects to the RPC server, starts all
   * microservices, and listens on the service port
   */
  async setup(): Promise<void> {
    this.connectRpcServer();
    if (!isEmpty(this.microServices)) {
      await this.app.startAllMicroservices();
    }

    await this.app.listen(this.config.port);
    const url = await this.app.getUrl();

    this.logger.debug('REST started', url);
    this.microServices.grpc &&
      this.logger.debug('gRPC started', this.config.gRpcUrl);
    this.config.hasGraphql &&
      this.logger.debug('GRAPHQL started', url + '/graphql');
  }

  /**
   * When the process is terminated, the app will close and the process will exit
   */
  handleProcessTerminate() {
    process.on('SIGINT', async () => {
      setTimeout(() => process.exit(1), 5000);
      await this.app.close();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      setTimeout(() => process.exit(1), 5000);
      await this.app.close();
      process.exit(0);
    });
  }
}
