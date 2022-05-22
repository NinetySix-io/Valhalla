import { BOOT, IBoot } from '@nestcloud2/common';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { INestApplication, Logger } from '@nestjs/common';

export class ServCoreSetup {
  app: INestApplication;
  hostname = '0.0.0.0';
  logger = Logger;
  hasMicroservices = false;
  grpc?: {
    protoPath: string | string[];
    package: string;
  };

  constructor(
    app: INestApplication,
    options?: {
      grpc?: ServCoreSetup['grpc'];
      hostName?: ServCoreSetup['hostname'];
    },
  ) {
    this.app = app;
    this.grpc = options?.grpc;
    this.hostname = options?.hostName ?? this.hostname;
  }
  /**
   * It returns the `IBoot` instance that was registered with the `App` instance
   * @returns The boot object.
   */
  private get boot() {
    return this.app.get<IBoot>(BOOT);
  }

  /**
   * It returns the value of the service.port property from the bootstrap configuration
   * @returns The port number of the service.
   */
  private get servicePort(): number {
    return this.boot.get('service.port');
  }

  /**
   * It returns the value of the grpc.port property from the bootstrap file.
   * @returns The value of the property 'grpc.port' in the boot object.
   */
  private get gRpcPort(): number {
    return this.boot.get('grpc.port');
  }

  private get gRpcUrl(): string {
    return `${this.hostname}:${this.gRpcPort}`;
  }

  /**
   * It connects the gRPC server to the NestJS application
   */
  private connectRpcServer(): void {
    if (!this.gRpcPort || !this.grpc) {
      return;
    }

    this.hasMicroservices = true;
    const options: GrpcOptions['options'] = {
      url: this.gRpcUrl,
      protoPath: this.grpc.protoPath,
      package: this.grpc.package,
    };

    this.logger.debug('gRPG', this.gRpcUrl);
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
    if (this.hasMicroservices) {
      await this.app.startAllMicroservices();
    }

    await this.app.listen(this.servicePort);
    const url = await this.app.getUrl();
    this.logger.debug('REST started', url);
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
