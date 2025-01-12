import { INestApplication, Logger } from '@nestjs/common';
import { GrpcOptions, Transport } from '@nestjs/microservices';

import { Boot } from '@nestcloud2/boot';
import { BOOT } from '@nestcloud2/common';
import isEmpty from 'lodash.isempty';
import { ServAppConfigService } from '../services';

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
    if (!this.grpc) {
      return;
    }

    this.microServices.grpc = true;
    const options: GrpcOptions['options'] = {
      ...this.grpc,
      url: this.config.gRpcUrl,
    };

    this.logger.debug('With gRPC');

    /**
     * If {option.url} is not provided, its default to 5000
     */
    this.app.connectMicroservice<GrpcOptions>(
      {
        transport: Transport.GRPC,
        options,
      },
      { inheritAppConfig: true },
    );
  }

  /**
   * The function `setup()` is an asynchronous function that connects to the RPC server, starts all
   * microservices, and listens on the service port
   */
  async setup(): Promise<void> {
    this.connectRpcServer();
    if (!isEmpty(this.microServices)) {
      this.logger.debug('Starting all microservices');
      await this.app.startAllMicroservices();
    }

    await this.app.listen(this.config.restPort);

    this.logger.debug('REST started', this.config.restUrl);
    this.microServices.grpc &&
      this.logger.debug('gRPC started', this.config.gRpcUrl);
    this.config.hasGraphql &&
      this.logger.debug('GRAPHQL started', this.config.restUrl + '/graphql');
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
